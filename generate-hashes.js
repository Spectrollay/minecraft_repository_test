const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const projectDir = path.resolve("./"); // 项目根目录
const outputPath = 'file-hashes.json'; // 哈希值文件输出路径

const excluded = [
    '.git',
    '.idea',
    'deprecated_features',
    'experiments_internal',
    '!important',
    'node_modules',
    'package.json',
    'package-lock.json',
    'generate-hashes.js',
];

function calculateHash(filePath) {
    const hash = crypto.createHash('md5');
    const fileContent = fs.readFileSync(filePath);
    hash.update(fileContent);
    return hash.digest('hex');
}

function isExcluded(filePath) {
    const relativePath = path.relative(projectDir, filePath);
    return excluded.some(exclude => relativePath.startsWith(exclude));
}

function getAllFiles(dirPath, filesList = []) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!isExcluded(fullPath)) {
                getAllFiles(fullPath, filesList);
            }
        } else {
            if (!isExcluded(fullPath)) {
                filesList.push(fullPath);
            }
        }
    });
    return filesList;
}

function generateFileHashes() {
    const allFiles = getAllFiles(projectDir);
    const hashList = {};

    allFiles.forEach(file => {
        hashList[path.relative(projectDir, file)] = calculateHash(file);
    });

    fs.writeFileSync(outputPath, JSON.stringify(hashList, null, 2), 'utf-8');
    console.log(`哈希值已保存至${outputPath}`);
}

generateFileHashes();
