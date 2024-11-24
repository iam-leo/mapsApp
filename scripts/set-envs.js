const { writeFileSync, mkdirSync } = require('fs')
require('dotenv').config();

const targetPath = 'src/environments/environment.ts'

const envFileContent = `
export const environment = {
    TOMTOM_KEY: "${process.env.TOMTOM_KEY}"
}
`

mkdirSync('./src/environments', { recursive: true });
writeFileSync(targetPath, envFileContent);