import {Command} from 'commander';
import {generateTestCases} from "./generator.js";
const program = new Command();

program
 .version("1.0.0")
 .name("testy")
 .description("AI test agent - own your tests")


 program
  .command("generate <file>")
  .description("Generate test cases for specific file")
  .action(async(file) => {
    await generateTestCases(file);
  })

  program.parse();
  
