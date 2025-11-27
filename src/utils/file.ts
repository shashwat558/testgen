import fs from "fs"
export const checkFileExists = async(filePath: string) => {
    try{
        await fs.promises.access(filePath, fs.constants.F_OK);
        console.log(`File exists`)
        return true;
    }
    catch(error){
        console.error("File does not exists", error)
        return false;
    }
}





export async function smartMerge(testPath: string, aiCode: string): Promise<string> {

  if (!fs.existsSync(testPath)) {
    return aiCode.trim() + '\n';
  }

  const existingCode = await fs.promises.readFile(testPath, 'utf-8');

  const getTitles = (code: string): Set<string> => {
    const titles = new Set<string>();
    const regex = /(?:test|it)(?:\.\w+)?\s*\(\s*['"`](.+?)['"`]/g;
    let match;
    while ((match = regex.exec(code))) {
      titles.add(match[1].trim().toLowerCase());
    }
    return titles;
  };

  const existingTitles = getTitles(existingCode);

  const lines = aiCode.split('\n');
  const filteredLines: string[] = [];
  let inTestBlock = false;
  let currentTestTitle = '';

  for (const line of lines) {
    const testMatch = line.match(/(test|it)(?:\.\w+)?\s*\(\s*['"`](.+?)['"`]/);
    
    if (testMatch) {
      currentTestTitle = testMatch[2].trim().toLowerCase();
      inTestBlock = true;

      if (!existingTitles.has(currentTestTitle)) {
        filteredLines.push(line);
      } else {
        inTestBlock = false;
      }
    } else if (inTestBlock) {
      if (!existingTitles.has(currentTestTitle)) {
        filteredLines.push(line);
      }
      if (line.trim().endsWith('});') || line.trim().endsWith('})')) {
        inTestBlock = false;
      }
    } else {
      filteredLines.push(line);
    }
  }

  const newCode = filteredLines.join('\n').trim() + '\n';

  if (newCode === aiCode.trim() + '\n') {
    console.log('No new tests to add');
    return existingCode;
  }
  const existingLines = existingCode.split('\n');
  let insertAt = existingLines.length - 1;

  for (let i = existingLines.length - 1; i >= 0; i--) {
    if (existingLines[i].trim().startsWith('});') || existingLines[i].trim() === '}') {
      insertAt = i;
      break;
    }
  }

  const before = existingLines.slice(0, insertAt).join('\n');
  const after = existingLines.slice(insertAt).join('\n');

  return `${before}\n\n${newCode}\n${after}`;
}