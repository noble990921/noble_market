const fs = require('fs');
const path = require('path');

let deletedCount = 0;
let totalSize = 0;

function deletePngFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    // 폴더면 재귀 처리
    if (file.isDirectory()) {
      deletePngFiles(fullPath);
      continue;
    }

    // PNG, JPG, JPEG 파일 삭제
    if (file.name.match(/\.(png|jpg|jpeg)$/i)) {
      try {
        const stats = fs.statSync(fullPath);
        const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

        fs.unlinkSync(fullPath);

        totalSize += stats.size;
        deletedCount++;

        console.log(`🗑️  Deleted: ${file.name} (${sizeMB}MB)`);
      } catch (error) {
        console.error(`❌ Failed to delete: ${file.name}`, error.message);
      }
    }
  }
}

// 실행
const mediaDir = path.join(__dirname, '../public/media/products');

console.log('🚀 Starting PNG/JPG deletion...');
console.log(`📁 Target directory: ${mediaDir}\n`);

const startTime = Date.now();

deletePngFiles(mediaDir);

const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
const totalSizeGB = (totalSize / 1024 / 1024 / 1024).toFixed(2);

console.log('\n✨ Deletion complete!');
console.log(`🗑️  Deleted: ${deletedCount} files`);
console.log(`💾 Space freed: ${totalSizeGB}GB`);
console.log(`⏱️  Time: ${elapsed}s`);
