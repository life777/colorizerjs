const { fileChecker, readFolder } = require("../utils/fileProcessor");
const cutImg = require("./cutImg");
const fs = require("fs");
const jpeg = require("jpeg-js");
const util = require("util");
const path = require("path");
const readFile = util.promisify(fs.readFile);

// jpeg-js can't decode JPG files with streams
const readMonochromeFile = async filePath => {
    let content = await readFile(filePath);
    return jpeg.decode(content, true);
};

module.exports = async folder => {
    let allFiles = (await readFolder(folder)).map(f => path.join(folder, f));

    const areFilesValid = await Promise.all(allFiles.map(fileChecker));
    if (areFilesValid.some(isValid => !isValid)) {
        throw new Error("One of the files is invalid");
    }

    let imgs = await Promise.all(allFiles.map(readMonochromeFile));

    let smallestHeight = imgs.reduce((a, b) => a.height < b.height ? a : b);
    let smallestWidth = imgs.reduce((a, b) => a.width < b.width ? a : b);

    return imgs.map(img => cutImg(img, smallestHeight, smallestWidth));
};