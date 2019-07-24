const { fileChecker } = require("../utils/fileProcessor");
const monochrome = require("./monochrome");
const path = require("path");
const jpeg = require("jpeg-js");
const util = require("util");
const fs = require("fs");
const writeFile = util.promisify(fs.writeFile);

let colorfulFile = process.argv[2];

const fileNames = ["r", "g", "b"];

(async function () {
    let filePath = path.join(__dirname, colorfulFile);
    await fileChecker(filePath);

    let channels = await monochrome(filePath);

    await Promise.all(
        channels
            .map((channel, i) => ({ file: jpeg.encode(channel, 100), name: fileNames[i] }))
            .map(({ file, name }) => writeFile(`./dist/${ name }.jpg`, file.data, { encoding: null }))
    );
})();