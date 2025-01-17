const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname,"temp", "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executePy = (filepath, inputPath) => {
    // const jobId = path.basename(filepath).split(".")[0];
    // const outPath = path.join(outputPath, `${jobId}.out`);

    return new Promise((resolve, reject) => {
        exec(
            `python3 "${filepath}" < "${inputPath}"`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                    return;
                }
                if (stderr) {
                    reject(stderr);
                    return;
                }
                resolve(stdout);
            }
        );
    });
};

module.exports = {
    executePy,
};
