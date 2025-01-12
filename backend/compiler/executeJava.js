const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname,"compiler", "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filepath, inputPath) => {
    const jobId = path.basename(filepath).split(".")[0];
    // const outPath = path.join(outputPath, `${jobId}.out`);

    return new Promise((resolve, reject) => {
        exec(
            `java "${filepath}" < "${inputPath}"`,
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
    executeJava,
};
