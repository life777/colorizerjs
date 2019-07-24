const fs = require("fs");
const jpeg = require("jpeg-js");
const util = require("util");
const readFile = util.promisify(fs.readFile);

// jpeg-js can't decode JPG files with streams
const readColorfulFile = async filePath => {
    let content = await readFile(filePath);
    return jpeg.decode(content, true);
};

const createImageChannel = (byteLength, width, height) => ({
    data: new Uint8Array(byteLength),
    width,
    height
});

const fillMonochromeBytes = (byteArray, pixIndex, value) => {
    byteArray[pixIndex] = value;
    byteArray[pixIndex + 1] = value;
    byteArray[pixIndex + 2] = value;
    byteArray[pixIndex + 3] = 255;
};

module.exports = async (colorfulFile) => {
    const img = await readColorfulFile(colorfulFile);
    const byteLength = img.data.byteLength;
    const r = createImageChannel(byteLength, img.width, img.height);
    const g = createImageChannel(byteLength, img.width, img.height);
    const b = createImageChannel(byteLength, img.width, img.height);

    for (let i = 0; i < byteLength; i += 4) {
        fillMonochromeBytes(r.data, i, img.data[i]);
        fillMonochromeBytes(g.data, i, img.data[i + 1]);
        fillMonochromeBytes(b.data, i, img.data[i + 2]);
    }

    return [r, g, b];
}