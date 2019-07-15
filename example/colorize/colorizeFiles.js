const path = require("path");
const jpeg = require("jpeg-js");
const getFiles = require("./getFiles");
const util = require("util");
const fs = require("fs");
const writeFile = util.promisify(fs.writeFile);

let folder = process.argv[2];

const createCombinations = elts => {
    if (elts.length === 1) {
        return [elts];
    }

    return elts.reduce((akk, elt, index, arr) => {
        return akk.concat(
            createCombinations([
                ...arr.slice(0, index),
                ...arr.slice(index + 1)
            ]).map(subArr => [elt, ...subArr])
        );
    }, []);
};

const genereateColorfulFile = ([r, g, b]) => {
    let len = r.data.byteLength;
    let colorizedImg = new Uint8Array(len);
    for (let i = 0; i < len; i += 4) {
        colorizedImg[i] = r.data[i];
        colorizedImg[i + 1] = g.data[i];
        colorizedImg[i + 2] = b.data[i];
        colorizedImg[i + 3] = 255;
    }

    return jpeg.encode({
        data: colorizedImg,
        width: r.width,
        height: r.height,
    }, 100);
};

(async function () {
    let rgbFiles = await getFiles(path.join(__dirname, folder));

    let combinations = createCombinations(rgbFiles);
    let files = combinations.map(genereateColorfulFile);

    await Promise.all(
        files.map((f, index) => writeFile(`./dist/result${ index + 1 }.jpg`, f.data, { encoding: null }))
    );
})();