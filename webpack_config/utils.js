const path = require('path');
const rootPath = path.resolve(__dirname, '../');
const resolvePath = relativePath => path.resolve(rootPath, relativePath);

const serverEntry = resolvePath('src/server/index.ts');
const serverOutput = resolvePath('dist/server');

const clientEntry = resolvePath('src/client/index.tsx');
const clientOutput = resolvePath('public');

const nodeModules = resolvePath('node_modules');

function formatDefine(target) {
    const result = {};

    for (const key in target) {
        const element = target[key];

        if (typeof element === 'boolean' || typeof element === 'number') {
            result[key] = element;
        } else {
            result[key] = JSON.stringify(element);
        }
    }

    return result;
}

module.exports = {
    serverEntry,
    serverOutput,
    nodeModules,
    formatDefine,
    clientEntry,
    clientOutput
}