import chalk from "chalk"
import * as fs from 'fs';
import * as path from "path";
import { checkFileExists, smartMerge } from "./utils/file.js";
import { detectFramework, detectLanguage } from "./utils/framework.js";
import { buildPrompt } from "./prompts/index.js";
import { callAI } from "./ai/client.js";


export async function generateTestCases(filePath: string){
    

    const fileExists = await checkFileExists(filePath);
    if(!fileExists){
        const error = chalk.bold.red(`File ${filePath} does not exist`);
        console.log(error);
        return;
    }

    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    if(!fileContent){
        const error = chalk.bold.red(`File ${filePath} is empty`);
        console.log(error);
        return;
    }
    
    
    const framework = detectFramework();

    if(framework === "unknown"){
        const message = chalk.bold.yellow(`No framework detected, defaulting to Jest`);
        console.log(message);
    }

    const language = detectLanguage();

    const prompt = buildPrompt(fileContent, {framework, filename: filePath})
    console.log(prompt);

    const testCode = await callAI(prompt)
    console.log(testCode);

    const testFilePath = filePath.replace(/\.(ts|js|py)$/, '.test.js');


    if(fs.existsSync(testFilePath)){
        const merged = await smartMerge(testFilePath, testCode);
        console.log(merged + "=============================================")
        fs.writeFileSync(testFilePath, merged);
        if(merged === "existing file content"){
            console.log(chalk.bold.green(`Test cases already exist in ${testFilePath}`));
            return;
        } 
    
    




    

    } else {
        
            fs.writeFileSync(testFilePath, testCode);
            console.log(`Created a new file: ${testFilePath}`);
        }

    return {preview: testCode}
}

