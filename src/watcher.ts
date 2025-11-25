import chalk from "chalk";
import { generateTestCases } from "./generator.js";
import fs from "fs";

let debounceTimer: NodeJS.Timeout | null = null;
const DEBOUNCE_MS = 500;
export async function watchFiler(filePath: string, options: any = {}){
    console.log(chalk.cyan("Generating initial tests..."));
    await generateTestCases(filePath)

    console.log(chalk.green('Watching for changes...') + ' (Ctrl+C to stop)\n');

    const watcher = fs.watch(filePath, (event) => {
        if(event !== 'change') return;

        if(debounceTimer) clearTimeout(debounceTimer);

        debounceTimer = setTimeout(async () => {
            console.log(chalk.gray(`\n[${new Date().toLocaleTimeString()}] File changed → regenerating...`));

            try {
                    await generateTestCases(filePath);
                    console.log(chalk.green('Tests updated'));
                    if (options.run) {
                    
                    console.log(chalk.blue('Running tests...'));
                    }
                } catch (err: any) {
                    console.log(chalk.red('Failed:'), err.message);
            }
        }, DEBOUNCE_MS)
    });

    process.on('SIGINT', () => {
    watcher.close();
    console.log(chalk.yellow('\nWatching stopped. Goodbye!'));
    process.exit(0);
  });


}