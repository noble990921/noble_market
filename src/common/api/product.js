import {db} from "@/firebase";

export const getProductData = async () => {
  try {
    const snapshot = await db.collection("products").get();
    const products = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        createDate: data.createDate ? data.createDate.toDate() : "",
        category: data.category || "",
        title: data.title || "",
        isOpen: data.isOpen || false,
        content: data.content || "",
        price: data.price || 0,
        img: data.img || "",
        sellQuantity: data.sellQuantity || 0,
      });
    });
    return products;
  } catch (error) {
    console.error("상품 목록 가져오기 오류:", error);
    throw error;
  }
};