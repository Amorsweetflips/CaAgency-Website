const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logosDir = path.join(__dirname, '..', 'public', 'images', 'logos');

async function convertPngToWebp() {
  const files = fs.readdirSync(logosDir);
  const pngFiles = files.filter(f => f.endsWith('.png'));
  
  console.log(`Found ${pngFiles.length} PNG files to convert...`);
  
  for (const file of pngFiles) {
    const inputPath = path.join(logosDir, file);
    const outputPath = path.join(logosDir, file.replace('.png', '.webp'));
    
    try {
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      console.log(`✓ Converted: ${file} -> ${file.replace('.png', '.webp')}`);
    } catch (err) {
      console.error(`✗ Failed: ${file}`, err.message);
    }
  }
  
  console.log('Done!');
}

convertPngToWebp();
