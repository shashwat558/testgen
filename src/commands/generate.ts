import { generateTestCases } from "../generator.js";

export async function generateCommand(file: string, options: any) {
    const result = await generateTestCases(file);

    if(options.dryRun) {
        console.log("Preview:\n");
        console.log(result?.preview);
        return;

    }

    if(options.run) {
        console.log("Running tests...");
        await runTest();
    }

    if(options.watch){
        console.log(`Watching ${file}`);
        watchFile(file, options)
    }
}