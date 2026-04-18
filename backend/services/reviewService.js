const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/reviews.json");

const getReviewsByProduct = (productId) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return data.filter((r) => r.productId === productId);
};

// filter to remove extra reviews not related to main idea
const filterReviews = (reviews, question) => {
  const words = question
    .toLowerCase()
    .split(" ")
    .filter(w => w.length > 3); // ignore small words like "is", "the"

  return reviews
    .map(r => r.review)
    .filter(text =>
      words.some(word => text.toLowerCase().includes(word))
    );
};
module.exports = {
  getReviewsByProduct,
  filterReviews
};