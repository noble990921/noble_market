const fs = require('fs');
const path = require('path');

// 사용법:
// node scripts/updateDetailText.js <productId> "<텍스트>"
// 예: node scripts/updateDetailText.js 910 "**title1**\ncontent1\n**title2**\ncontent2"

const productId = process.argv[2];
const detailTextRaw = process.argv[3];

if (!productId || !detailTextRaw) {
  console.log('사용법: node scripts/updateDetailText.js <productId> "<텍스트>"');
  console.log('예시: node scripts/updateDetailText.js 910 "**title**\\ncontent"');
  process.exit(1);
}

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
  console.error(`❌ Product ID ${productId} not found in bag.js`);
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


// 사용법:
// node scripts/updateDetailText.js <productId> "<텍스트>"
// 예: node scripts/updateDetailText.js 910 "**title1**\ncontent1\n**title2**\ncontent2"

//node scripts/updateDetailText.js 909 "**정품 동일 광택 송아지가죽 표면에 매끄럽게 마감된 하프문 형태**
//
//견고한 형태감과 부드러운 곡선 라인으로 펜디 특유 구조 완벽 재현
//
//**하단 금속 로고 디테일은 ‘FENDI’ 레터링을 곡선에 맞춰 정밀 조형**
//
//각인·배치·폰트 간격까지 정품 기준과 동일 설계되어 포인트 완성
//
//**탑 핸들은 투톤 스트랩에 골드 톤 스냅훅 연결 방식으로 정밀 구현**
//
//연결 부위 메탈 파츠의 디테일 재현 및 착용 시 사용감과 각도 일치
//
//**지퍼 클로저는 가방 상단 곡선 라인과 정확히 일치하도록 곡률 가공**
//
//지퍼 라인이 자연스레 곡선을 따라가며, 슬라이더 디자인 정품 동일
//
//**내부는 미세 스웨이드 안감과 내부 포켓 구성까지 완벽하게 복각**
//
//내장 로고 라벨과 포켓 형태, 안감 컬러 및 텍스처감까지 정품 기준
//
//**실루엣은 좌우 대칭 하프문 구조로, 착용 볼륨감과 곡선 쉐입 동일**
//
//사이즈 대비 존재감 있는 곡선 라인이 강조되어 실루엣 안정감 확보"