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

export const writeTestFile = async(filePath: string, testCases: string)=> {
    
    
}


export const smartMerge = async(testPath: string, testcases: string)=> {
    const testFileContent = await fs.promises.readFile(testPath, "utf-8");
    
    const extractTestTitles = (code: string): Set<string> => {
    const titles = new Set<string>();

    
    const regex = /(?:test|it)(?:\.\w+)?\s*\(\s*['"](.+?)['"]/g;
    let match;
    while ((match = regex.exec(code)) !== null) {
      const title = match[1].trim().toLowerCase();
      titles.add(title);
    }

    return titles;
  };

  const existingTitles = extractTestTitles(testFileContent);
  const aiTitles = extractTestTitles(testcases);

  const newTests: string[] = [];
  let inDescribe = false;
  let currentBlock = "";

  for(const line of testcases.split("\n")){
    if(line.trim().startsWith("describe(")){
      inDescribe = true;
      currentBlock += line + "\n";
      continue;
    }
    if(line.trim().startsWith('})') && inDescribe){
      currentBlock += line + '\n';
      inDescribe = false;
      continue;
    }

    const testMatch = line.match(/(test | it)(?:\.w+)?\s*\(\s*['"](.+?)['"]/);
    if(testMatch){
      const title = testMatch[2].trim().toLowerCase();
      if(!existingTitles.has(title) && !aiTitles.has(title)){
        newTests.push(currentBlock + line);
        currentBlock = '';
      }
    }

    if(inDescribe){
      currentBlock += line + '/n';

    }

  }

  if(newTests.length === 0){
    return testFileContent;
  }

  const lines = testFileContent.split("\n");
  let insertIndex = lines.length;

  for(let i = lines.length - 1; i >= 0; i--){
    if(lines[i].trim() === "});" || lines[i].trim() === "}" || lines[i].includes("describe(")){
      insertIndex = i;
      break;
    }

  }

  const indent = '  ';
  const indentNewTests = newTests
   .join("\n")
   .split('\n')
   .map(l => (l.trim() ? indent + 1: 1))
   .join('\n');

  
  const before = lines.slice(0, insertIndex).join('\n');
  const after = lines.slice(insertIndex).join('\n');

  const finalCode = `${before}\n\n${indentNewTests}\n${after}`;


  return finalCode.trim + '\n'
}