import { generateTestCases } from "../generator.js";
import { runTest } from "../runner.js";
import { watchFiler } from "../watcher.js";

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
        watchFiler(file, options)
    }
}