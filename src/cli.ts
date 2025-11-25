
import { Command } from 'commander';
import { generateTestCases } from './generator.js';
import { watchFiler } from './watcher.js';


const program = new Command();

program
  .name('testy')
  .description('AI test agent — owns your tests')
  .version('1.0.0');

program
  .command('generate <file>')
  .description('Generate tests for a file')
  .option('--run', 'Run tests after generation')
  .option('--watch', 'Watch file and regenerate on save')
  .option('--yes', 'Auto-apply without confirmation')
  .option('--dry-run', 'Show what would be generated without writing')
  .option('--force', 'Overwrite existing test file (dangerous)')
  .action(async (file: string, options: any) => {
    const opts = {
      run: !!options.run,
      watch: !!options.watch,
      yes: !!options.yes,
      dryRun: !!options.dryRun,
      force: !!options.force,
    };

    if (opts.watch) {
      console.log(`Watching ${file}... (Ctrl+C to stop)\n`);
      watchFiler(file, opts);
      return;
    }

    await generateTestCases(file);
  });

program
  .command('watch <file>')
  .description('Watch a file and keep tests up to date')
  .option('--run', 'Auto-run tests on change')
  .action((file: string, options: any) => {
    console.log(`Watching ${file}... (Ctrl+C to stop)\n`);
    watchFiler(file, { run: !!options.run });
  });

program.parse();