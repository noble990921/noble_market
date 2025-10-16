const fs = require('fs');
const path = require('path');

// 수정할 파일 목록
const files = [
  path.join(__dirname, '../src/data/products/bag.js'),
  path.join(__dirname, '../src/data/products/shoes.js'),
  path.join(__dirname, '../src/data/products/watch.js'),
  path.join(__dirname, '../src/data/products/wallet.js'),
  path.join(__dirname, '../src/data/products/top.js'),
  path.join(__dirname, '../src/data/products/bottom.js'),
];

let totalReplaced = 0;

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipped: ${path.basename(filePath)} (file not found)`);
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // .png, .jpg, .jpeg를 .webp로 변경
    content = content.replace(/\.png(['"])/g, '.webp$1');
    content = content.replace(/\.jpg(['"])/g, '.webp$1');
    content = content.replace(/\.jpeg(['"])/g, '.webp$1');

    // 변경사항이 있으면 파일 저장
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');

      const matches = originalContent.match(/\.(png|jpg|jpeg)['"]/g);
      const count = matches ? matches.length : 0;

      console.log(`✅ Updated: ${path.basename(filePath)} (${count} images)`);
      totalReplaced += count;
    } else {
      console.log(`⏭️  No changes: ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.error(`❌ Failed: ${path.basename(filePath)}`, error.message);
  }
});

console.log(`\n✨ Total images updated: ${totalReplaced}`);


