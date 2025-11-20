export const JEST_PROMPT = `You are an expert TypeScript test engineer who writes perfect Jest tests.

Write complete, ready-to-run Jest unit tests for the following code.

CODE:
\`\`\`ts
{{CODE}}
\`\`\`

REQUIREMENTS (follow exactly):
- Use describe() and test()
- Import from './{{FILENAME}}'
- Cover happy path + ALL edge cases (null, undefined, empty, 0, negative, NaN, Infinity, float precision)
- Add a short comment above each test explaining WHY
- Use toBeCloseTo() for floats
- Use .toThrow() / .rejects.toThrow()
- Never use test.skip or test.todo
- Output ONLY the test file code. No explanations, no backticks.

Generate the full test file now.`;

