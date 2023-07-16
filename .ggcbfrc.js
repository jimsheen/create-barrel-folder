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
