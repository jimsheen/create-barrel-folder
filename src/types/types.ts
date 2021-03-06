export interface Config {
  "fileType": "ts" | "js" | "tsx" | "jsx";
  "reactFileType": "tsx" | "jsx";
  "typescript": boolean,
  "barrel": boolean,
  "scss": boolean,
  "test": boolean,
  "story": boolean,
  hook: boolean,
}
