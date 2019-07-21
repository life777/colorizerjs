const path = require("path");
const getFiles = require("./getFiles");
const createPremutations = require("../utils/premutations");
const genereateColorfulFile = require("../utils/combineChannels");
const util = require("util");
const fs = require("fs");
const writeFile = util.promisify(fs.writeFile);

let folder = process.argv[2];

(async function () {
    let rgbFiles = await getFiles(path.join(__dirname, folder));

    let combinations = createPremutations(rgbFiles);
    let files = combinations.map(genereateColorfulFile);

    await Promise.all(
        files.map((f, index) => writeFile(`./dist/result${ index + 1 }.jpg`, f.data, { encoding: null }))
    );
})();