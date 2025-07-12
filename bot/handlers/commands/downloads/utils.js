const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function downloadFile(url, ext) {
  const filePath = path.join(__dirname, `../../../../data/${Date.now()}-file.${ext}`);
  const res = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFileSync(filePath, res.data);
  return filePath;
}

module.exports = { downloadFile };
