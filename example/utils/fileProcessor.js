const fs = require("fs");
const util = require("util");
const path = require("path");
const stat = util.promisify(fs.stat);
const readdir = util.promisify(fs.readdir);

const acceptedExtensions = [".jpg", ".jpeg"];
const isAcceptedExtension = ext => acceptedExtensions.indexOf(ext) >= 0;

module.exports = {
    fileChecker: async filePath => {
        let ext = path.extname(filePath);
    
        if (!isAcceptedExtension(ext)) {
            throw new Error(`Wrong extension. Accespted extensions are: ${ acceptedExtensions.join(", ") }`);
        }
    
        try {
            let fileStat = await stat(filePath);
            if (!fileStat.isFile()) {
                throw new Error(`Only ${ acceptedExtensions } are acepted!`);
            }
        } catch (e) {
            throw new Error(`Couldn't read one of the provided files. Exception: ${ e.message }`);
        }
    
        return true;
    },
    readFolder: async folderPath => {
        try {
            let folderStat = await stat(folderPath);
            if (!folderStat.isDirectory()) {
                throw new Error(`You should provide a folder with at least 3 files`);
            }

            let files = (await readdir(folderPath)).filter(file => isAcceptedExtension(path.extname(file)));
            if (files.length < 3) {
                throw new Error(`You should provide a folder with at least 3 files`);
            }

            return files.slice(0, 3);
        } catch (e) {
            throw new Error(`Couldn't read folder. Exception: ${ e.message }`);
        }
    }
};