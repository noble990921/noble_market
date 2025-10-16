const fs = require('fs');
const path = require('path');

// 사용법:
// 1. temp.txt 파일에 노션에서 복사한 내용 붙여넣기
// 2. node scripts/updateDetailTextFromFile.js <productId>
// 예: node scripts/updateDetailTextFromFile.js 909

const productId = process.argv[2];

if (!productId) {
  console.log('사용법: node scripts/updateDetailTextFromFile.js <productId>');
  console.log('1. temp.txt 파일에 내용을 붙여넣으세요');
  console.log('2. node scripts/updateDetailTextFromFile.js 909');
  process.exit(1);
}

// temp.txt 파일 읽기
const tempFilePath = path.join(__dirname, '../temp.txt');

if (!fs.existsSync(tempFilePath)) {
  console.error('❌ temp.txt 파일이 없습니다');
  console.log('프로젝트 루트에 temp.txt 파일을 만들고 노션 내용을 붙여넣으세요');
  process.exit(1);
}

const detailTextRaw = fs.readFileSync(tempFilePath, 'utf8');

// 텍스트 파싱: ** ** 사이는 title, 나머지는 content
function parseDetailText(text) {
  const lines = text.split('\n').filter(line => line.trim());
  const result = [];
  let currentTitle = '';

  for (const line of lines) {
    const trimmed = line.trim();

    // **로 감싸진 title 찾기
    const titleMatch = trimmed.match(/^\*\*(.*?)\*\*$/);

    if (titleMatch) {
      currentTitle = titleMatch[1];
    } else if (currentTitle) {
      // title 다음에 오는 content
      result.push({
        title: currentTitle,
        content: trimmed
      });
      currentTitle = ''; // 리셋
    }
  }

  return result;
}

// bag.js 파일 읽기
const bagFilePath = path.join(__dirname, '../src/data/products/bag.js');
let content = fs.readFileSync(bagFilePath, 'utf8');

// 제품 ID 찾기 - 중첩 구조를 포함하여 detailText까지 매칭
const productStart = content.indexOf(`"${productId}":`);
if (productStart === -1) {
  console.error(`❌ Product ID ${productId} not found in bag.js`);
  process.exit(1);
}

// productStart부터 detailText 찾기
const detailTextRegex = /detailText:\s*\[([^\]]*?)\]/s;
const searchArea = content.substring(productStart);
const match = searchArea.match(detailTextRegex);

if (!match) {
  console.error(`❌ detailText not found for product ${productId}`);
  process.exit(1);
}

// detailText 파싱
const detailTextArray = parseDetailText(detailTextRaw);

if (detailTextArray.length === 0) {
  console.error('❌ No valid title/content pairs found');
  process.exit(1);
}

// 새로운 detailText 생성
const newDetailText = detailTextArray.map(item =>
  `      {\n        title: '${item.title}',\n        content: '${item.content}'\n      }`
).join(',\n');

// 기존 detailText 교체
const oldDetailText = match[0];
const newBlock = `detailText: [\n${newDetailText}\n    ]`;

// 전체 파일에서 해당 부분 교체
const beforeMatch = content.substring(0, productStart);
const afterMatch = content.substring(productStart);
const replaced = afterMatch.replace(oldDetailText, newBlock);
content = beforeMatch + replaced;

// 파일 저장
fs.writeFileSync(bagFilePath, content, 'utf8');

console.log(`✅ Product ${productId} updated successfully!`);
console.log(`📝 Added ${detailTextArray.length} detail items:`);
detailTextArray.forEach((item, i) => {
  console.log(`   ${i + 1}. ${item.title}`);
});
