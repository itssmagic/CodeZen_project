const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

// Use "/tmp" in production (Vercel) and "./codes" locally
const dirCodes = path.join(__dirname,"compiler", 'codes');

// Ensure the directory exists (for local testing or in case it's missing)
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (language, code) => {
    const jobID = uuid();
    const filename = `${jobID}.${language}`;
    const filePath = path.join(dirCodes, filename);
    
    // Write the code file to the appropriate directory
    await fs.writeFileSync(filePath, code);
    return filePath;
};

module.exports = {
    generateFile,
};
