export const JEST_PROMPT = `You are an expert TypeScript test engineer who writes perfect Jest tests.

Write complete, ready-to-run Jest unit tests for the following code.

CODE:
\`\`\`ts
{{CODE}}
\`\`\`

REQUIREMENTS (follow exactly):
- The test file will be placed in the **same folder** as the file under test.
- So imports must be relative using: "./<filename>.js"
-for example import '{ add, subtract, multiply, divide } from './calculator.js'';
- Do NOT generate imports like './src/...'
- Always include '.js' extension in imports (NodeNext moduleResolution).
- Use describe() and test()
- Import from './{{FILENAME}}'
- Cover happy path + ALL edge cases (null, undefined, empty, 0, negative, NaN, Infinity, float precision)
- Add a short comment above each test explaining WHY
- Use toBeCloseTo() for floats
- Use .toThrow() / .rejects.toThrow()
- Never use test.skip or test.todo
- Output ONLY the test file code. No explanations, no backticks.

Generate the full test file now.`;

