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

// 计算文件的 MD5 哈希值
function calculateHash(filePath) {
    const hash = crypto.createHash('md5');
    const fileContent = fs.readFileSync(filePath);
    hash.update(fileContent);
    return hash.digest('hex');
}

// 判断文件路径是否在排除列表中
function isExcluded(filePath) {
    const relativePath = path.relative(projectDir, filePath);
    return excluded.some(exclude => relativePath.includes(exclude));
}

// 获取目录下所有文件
function getAllFiles(dirPath, filesList = []) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // 递归获取目录中的文件，跳过排除列表中的目录
            if (!isExcluded(fullPath)) {
                getAllFiles(fullPath, filesList);
            }
        } else {
            // 将文件添加到文件列表中，跳过排除列表中的文件
            if (!isExcluded(fullPath)) {
                filesList.push(fullPath);
            }
        }
    });
    return filesList;
}

// 生成文件哈希值并保存到 JSON 文件中
function generateFileHashes() {
    const allFiles = getAllFiles(projectDir);
    const hashList = {};

    allFiles.forEach(file => {
        hashList[path.relative(projectDir, file)] = calculateHash(file);
    });

    fs.writeFileSync(outputPath, JSON.stringify(hashList, null, 2), 'utf-8');
    console.log(`哈希值已保存至 ${outputPath}`);
}

// 执行生成哈希值的函数
generateFileHashes();
