const jpeg = require("jpeg-js");

module.exports = ([r, g, b]) => {
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