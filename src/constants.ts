export enum EComponentType {
  Component = 'Component',
  Hook = 'Hook',
}

export enum EOptions {
  Barrel = 'Barrel',
  Story = 'Story',
  Test = 'Test',
  Styled = 'Styled',
}

export const fileOptions = {
  [EOptions.Barrel]: 'barrel',
  [EOptions.Story]: 'story',
  [EOptions.Test]: 'test',
  [EOptions.Styled]: 'styled',
}

export const fileOptionValues = Object.values(fileOptions)

export const defaultTemplateData = {
  [fileOptions[EOptions.Barrel]]: true,
  [fileOptions[EOptions.Story]]: true,
  [fileOptions[EOptions.Test]]: true,
  [fileOptions[EOptions.Styled]]: true,
}
