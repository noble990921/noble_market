const fs = require("fs");

const sampleTexts = [
  "진짜 예쁜 빨간 가방이에요! 튼튼하고 수납력도 좋아요.",
  "가볍고 편해서 데일리로 딱입니다.",
  "사진보다 실물이 더 예뻐요.",
  "가죽 질감이 고급스럽고 색감도 마음에 들어요.",
  "선물용으로 구매했는데 만족도가 높아요.",
  "배송도 빠르고 포장도 꼼꼼했어요.",
  "가격 대비 퀄리티가 좋아요!",
  "지퍼 부분이 부드러워서 열고 닫기 편해요.",
  "부담 없이 들기 좋은 스타일이에요.",
  "옷이랑 잘 어울려서 자주 들게 돼요."
];

function getRandomDate() {
  const now = new Date();
  const past = new Date(now.getTime() - Math.random() * 1000 * 60 * 60 * 24 * 365);
  return past.toISOString().slice(0, 10);
}

//function getRandomImages(index) {
//  if (Math.random() < 0.6) {
//    const count = Math.floor(Math.random() * 3) + 1;
//    return Array.from({ length: count }, (_, i) =>
//        `require('@/assets/review_images/bag/${index + 1}-${i + 1}.jpg')`
//    );
//  }
//  return [];
//}

function getRandomUsername() {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let name = "";
  for (let i = 0; i < 2; i++) {
    name += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${name}*****`;
}

function generateReviews(count = 10) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    productId: 1, // 필요 시 랜덤 또는 실제 productId로 설정 가능
    user: getRandomUsername(),
    rating: Math.ceil(Math.random() * 5),
    content: sampleTexts[Math.floor(Math.random() * sampleTexts.length)],
    date: getRandomDate(),
//    images: getRandomImages(i)
  }));
}

const reviews = generateReviews(100);

const fileContent = `
export const BAG_REVIEWS = [
${reviews.map(r => `  {
    id: ${r.id},
    productId: ${r.productId},
    user: "${r.user}",
    rating: ${r.rating},
    content: "${r.content}",
    date: "${r.date}",
  }`).join(",\n")}
];
`;

fs.writeFileSync("./bagReviews.js", fileContent.trim());
console.log("✅ bagReviews.js 생성 완료!");