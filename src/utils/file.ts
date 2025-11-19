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