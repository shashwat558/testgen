import chalk from "chalk"
import * as fs from 'fs';
import * as path from "path";
import { checkFileExists } from "./utils/file.js";


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
    
    const testCases = await generateTestCases(fileContent)

    
}


