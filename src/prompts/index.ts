
import { JEST_PROMPT } from "./jest.js";
export function buildPrompt(code: string, options: { filename: string; framework?: string }) {
  const framework = options.framework || 'jest';

  let template = JEST_PROMPT; 


  return template
    .replace(/{{CODE}}/g, code.trim())
    .replace(/{{FILENAME}}/g, options.filename);
}