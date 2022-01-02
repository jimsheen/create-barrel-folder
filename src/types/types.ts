export interface Config {
  "fileType": "ts" | "js" | "tsx" | "jsx";
  "typescript": boolean,
  "barrel": boolean,
  "scss": boolean,
  "test": boolean,
  "story": boolean,
  type: "rfc" | "hook"
}
