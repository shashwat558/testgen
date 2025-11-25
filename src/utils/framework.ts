import fs from "fs"
import path from "path";
import {glob} from "glob";

export type Framework = 'jest' | 'vitest' | 'mocha' | 'pytest' | 'unknown';

export function detectFramework(cwd: string = process.cwd()): Framework {
    const pkgPath = path.join(cwd, "package.json");
    const pyProjectPath = path.join(cwd, "pyproject.toml");

    
    if(fs.existsSync(pkgPath)){
        try {
            const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))

            if(pkg.devDependencies && pkg.devDependencies.jest) return "jest";
            if(pkg.devDependencies && pkg.devDependencies.vitest) return "vitest";
            if(pkg.devDependencies && pkg.devDependencies.mocha) return "mocha";
            
            if(pkg.scripts && pkg.scripts.test.includes("vitest")) return "vitest";
            if(pkg.scripts && pkg.scripts.test.includes("jest")) return "jest";

            return "unknown";
        } catch (error) {
            return "unknown";
        }
    }

    const configFiles = [
        "vitest.config.ts",
        "vitest.config.js",
        "jest.config.js",
        "jest.config.ts",
        "mocha.opts"
    ]
    for(const file of configFiles) {
        const filePath = path.join(cwd, file);
        if(fs.existsSync(filePath)){
            if(file.includes('jest')) return "jest";
            if(file.includes('vitest')) return "vitest";
            if(file.includes("mocha")) return "mocha";
        }
    }

    //python projects

    if(fs.existsSync(pyProjectPath)){
        const content = fs.readFileSync(pyProjectPath, "utf-8")
        if(content.includes('[tool.pytest.ini_options]') || content.includes("pytest")) return "pytest";
    }


    const hasTestsFolder = fs.existsSync(path.join(cwd, "__tests__"));
    const hasTestFolder = fs.existsSync(path.join(cwd, "test"));
    const hasTsFile = glob.sync("**/*.ts", {cwd}).length > 0;

    if((hasTestsFolder || hasTestFolder) && hasTsFile){
        return 'jest';
    }

    return "unknown";
}

export type Language = "javascript" | "typescript" | "python" | "unknown";
export function detectLanguage(cwd: string = process.cwd()): Language {
    const tsConfigPath = fs.existsSync(path.join(cwd, "tsconfig.json"));
    const hasTsFiles = glob.sync("**/*.ts", {cwd}).length > 0;
    const hasPyFiles = glob.sync("**/*.py", {cwd}).length > 0;

    if(hasTsFiles || tsConfigPath) return "typescript";
    if(hasPyFiles) return "python";
    return "javascript";

}