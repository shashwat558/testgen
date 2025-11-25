import { execSync } from "child_process";

export function runTest() {
    execSync('npx jest --passWithNoTests', {stdio: 'inherit'})
}