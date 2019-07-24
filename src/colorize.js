const { fileChecker } = require("./utils/fileProcessor");
const createPremutations = require("./utils/premutations");
const genereateColorfulFile = require("./utils/combineChannels");
const monochrome = require("./monochrome/monochrome");
const path = require("path");
const util = require("util");
const fs = require("fs");
const writeFile = util.promisify(fs.writeFile);

let colorfulFile = process.argv[2];

(async function () {
    let filePath = path.join(__dirname, colorfulFile);
    await fileChecker(filePath);

    let channels = await monochrome(filePath);
    let combinations = createPremutations(channels);
    let files = combinations.map(genereateColorfulFile);

    await Promise.all(
        files.map((f, index) => writeFile(`./dist/result${ index + 1 }.jpg`, f.data, { encoding: null }))
    );
})();