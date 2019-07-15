const cutHeight = (img, height) => {
    let newLen = img.width * height * 4;
    let newData = new Uint8Array(newLen);
    for (let i = 0; i < newLen; ++i) {
        newData[i] = img.data[i];
    }

    return {
        data: newData,
        height,
        width: img.width
    }
};

const cutWidth = (img, width) => {
    let newLen = width * img.height * 4;
    let oldWidthLen = img.width * 4;
    let newWidthLen = width * 4;
    let newData = new Uint8Array(newLen);
    let counter = 0;
    let offset = 0;

    let rowsLen = img.height;
    for (let j = 0; j < rowsLen.height; ++j) {
        for (let i = 0; i < newWidthLen; ++i) {
            newData[counter++] = img.data[offset + i];
        }
        offset += oldWidthLen;
    }

    return {
        data: newData,
        height: newImg.height,
        width
    }
};

const cutImg = (img, height, width) => {
    let newImg = img;
    if (img.height > height) {
        newImg = cutHeight(newImg, height);
    }

    if (newImg.width > width) {
        newImg = cutWidth(newImg, height);
    }

    return newImg;
};

module.exports = (img, minHeight, minWidth) => {
    return cutImg(img, minHeight, minWidth);
};