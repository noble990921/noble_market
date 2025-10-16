const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 통계
let converted = 0;
let failed = 0;
let skipped = 0;

async function convertToWebP(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    // 폴더면 재귀 처리
    if (file.isDirectory()) {
      await convertToWebP(fullPath);
      continue;
    }

    // PNG, JPG, JPEG 파일만 변환
    if (file.name.match(/\.(png|jpg|jpeg)$/i)) {
      const webpPath = fullPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

      // 이미 WebP 파일이 있으면 스킵
      if (fs.existsSync(webpPath)) {
        console.log(`⏭️  Already exists: ${file.name}`);
        skipped++;
        continue;
      }

      try {
        await sharp(fullPath)
          .webp({ quality: 85 }) // 품질 85%
          .toFile(webpPath);

        const originalSize = fs.statSync(fullPath).size;
        const webpSize = fs.statSync(webpPath).size;
        const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

        console.log(`✅ ${file.name} → ${path.basename(webpPath)} (${savings}% smaller)`);
        converted++;
      } catch (error) {
        console.error(`❌ Failed: ${file.name}`, error.message);
        failed++;
      }
    }
  }
}

// 실행
const mediaDir = path.join(__dirname, '../public/media/products');

console.log('🚀 Starting WebP conversion...');
console.log(`📁 Target directory: ${mediaDir}\n`);

const startTime = Date.now();

convertToWebP(mediaDir)
  .then(() => {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('\n✨ Conversion complete!');
    console.log(`✅ Converted: ${converted} files`);
    console.log(`⏭️  Skipped: ${skipped} files`);
    console.log(`❌ Failed: ${failed} files`);
    console.log(`⏱️  Time: ${elapsed}s`);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });

//실행 방법
//node scripts/convertToWebP.js