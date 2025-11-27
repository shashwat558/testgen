export const JEST_PROMPT = `You are a strict Jest test generator. You MUST follow every rule below exactly.

CRITICAL RULES — NEVER BREAK THESE:

1. ALWAYS start the file with a require() line using this exact format:
   const { function1, function2, function3 } = require('./filename');

   - Replace "function1, function2..." with the real exported function names
   - Replace "filename" with the actual filename without extension
   - Example: const { add, subtract } = require('./calculator');
   - NEVER use import/export
   - NEVER add .js or .ts extension

2. Generate ONLY pure JavaScript — NO TypeScript syntax
   - NEVER use: as any, as const, !, satisfies, type assertions
   - For null/undefined tests, use: // @ts-ignore

3. Use exactly ONE describe() block
4. The output file will be named: filename.test.js
5. Cover all edge cases: happy path, negative, zero, null, undefined, empty string, floats (toBeCloseTo), NaN, Infinity, Symbol → throws TypeError

CODE TO TEST:
\`\`\`ts
{{CODE}}
\`\`\`

OUTPUT ONLY THE COMPLETE TEST FILE CODE — NO EXPLANATIONS, NO MARKDOWN.`;