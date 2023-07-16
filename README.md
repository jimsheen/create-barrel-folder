# Create Barrel Folder

This CLI tool helps to create a folder with a barrel index file and offers options to generate the following:

- React Functional Component
- React Hook
- Test file with testing library and component render setup
- Storybook stories
- SCSS file
- TypeScript or JavaScript files
- Support for custom configuration using an `.rc` file

## Usage

`npx create-barrel-folder ComponentName`

creates directory:

```
ComponentName
- ComponentName.tsx
- index.ts
```

`index.ts` (barrel file)

```ts
export { default } from './ComponentName'
export * from './ComponentName'
```

`ComponentName.tsx`

```ts
import React from 'react'
import './ComponentName.scss'

export interface ComponentNameProps {}

const ComponentName = ({}: ComponentNameProps) => {
  return (
    <>
      <h1>ComponentName</h1>
    </>
  )
}

export default ComponentName
```

## Custom Configuration

You can define a custom config file in your project root to set default behavior of the tool. The tool will look for the config file in the following order:

- a package.json property if it is needed
- a JSON or YAML, JS "rc file" .ggcbfrc or .ggcbfrc.json or .ggcbfrc.js or.ggcbfrc.yml, .ggcbfrc.yaml

Your custom config file should export an object with the configuration. The default overridable configuration structure is as follows:

```js
// ggcbfrc.js
module.exports = {
  component: {
    barrel: true,
    story: true,
    test: true,
    styled: true,
    rules: {
      required: {
        message: 'Component name is required',
      },
      tests: [
        {
          validate: (value) => /^[A-Z]/.test(value),
          message: 'Component name should start with a capital letter',
        },
        {
          validate: (value) => value.length >= 3,
          message: 'Component name should be at least 3 characters long',
        },
      ],
    },
  },
  hook: {
    barrel: true,
    test: true,
    styled: false,
    rules: {
      required: {
        message: 'Hook name is required',
      },
      tests: [
        {
          validate: (value) => /^use[A-Z]/.test(value),
          message: "Hook name should start with 'use'",
        },
      ],
    },
  },
}
```

You can override any of these defaults in your `.cbfrc.js` or `.cbfrc.ts` file. If you are using TypeScript for your `.cbfrc.ts` file, remember to transpile it to JavaScript, as Node.js cannot understand TypeScript natively.

## TODO

- [ ] Allow user to pass custom templates
- [x] Support custom `.rc` configuration files
