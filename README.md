# Create Barrel Folder

Create a folder with a barrel index file and options to generate the following:
- React Functional Component
- React Hook
- .test file with testing library and component render setup
- Storybook .stories
- SCSS file
- index.tsx 

## Installation

```
npm i -g @jimsheen/create-barrel-folder
```

## Usage

```cbf ComponentName```

creates directory:

```
ComponentName
- ComponentName.tsx
- index.ts
```

index.ts (barrel file)
```
export { default } from './ComponentName'
export * from './ComponentName'
```

ComponentName.tsx
```
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

## Options

CLI usage options `cbf --help`
```
Create Barrel File

  Auto create react files and folder with a barrel file 

Options

  --src string[]                                                                                        
  -h, --help              Display the usage guide                                                       
  -p, --proptypes         Create JS file with prop types                                                
  -s, --story             Create a storybook file                                                       
  -j, --test              Create a test file                                                            
  -c, --scss              Create an scss file                                                           
  -f, --fileType string   File type to create (tsx, ts, js, jsx)                                        
  -k, --hook              Create a React Hook
```

## Default Props

```
export interface Config {
  "fileType": "ts" | "js" | "tsx" | "jsx";
  "typescript": boolean,
  "barrel": boolean,
  "scss": boolean,
  "test": boolean,
  "story": boolean,
  hook: boolean,
}

const defaultConfig = {
  fileType: "tsx",
  typescript: true,
  barrel: true,
  scss: false,
  test: false,
  story: false,
  hook: false,
  type: "rfc"
} as Config
```

## Generated Files Example

#### React Functional Component `ComponentName.tsx`
```
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

#### Test file `ComponentName.test.tsx`

```
import React from 'react'
import { render, screen } from '@testing-library/react';

import ComponentName, { ComponentNameProps } from './ComponentName'

const defaultProps = {} as ComponentNameProps

const setup = (props?: ComponentNameProps) => {
  const newProps = {
  ...defaultProps,
  ...props
  } as ComponentNameProps;

  const utils = render(<ComponentName {...newProps} />);

  // example of how to query an element
  const element = () => screen.queryByText('some element')

  return {
    ...utils,
    element
  }
}

describe('ComponentName', () => {
  it('should render', () => {
    const { element } = setup()
    expect(element()).toBeInTheDocument()
  })
})
```

#### Storybook file `ComponentName.stories.tsx`
```
import React from 'react'
import { Story } from '@storybook/react'

import ComponentName, { ComponentNameProps } from './ComponentName'

export default {
  title: 'ComponentName',
  component: ComponentName,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
  args: {} as ComponentNameProps
}

const Template: Story<ComponentNameProps> = (args) => <ComponentName {...args} />

export const Default = Template.bind({})
Default.args = {}
```

#### SCSS file `ComponentName.scss`
```
.ComponentName {}
```

#### React Hook
`cbf useHookExample --hook` generates `useHookExample.tsx`
```
import React from 'react'

export interface useHookExampleProps {}

const useHookExample = ({}: useHookExampleProps) => {
  
  return {}
}

export default useHookExample
```

 ## TODO

 [ ] - Support Standard JS RFC
 [ ] - Add support for proptypes
 [ ] - Generate class components
 [ ] - Pass custom config file / default options (possible .rc file (install pacakge locally?))
 [ ]  - Allow user to pass custom templates
 [ ] - Generate CSS file
