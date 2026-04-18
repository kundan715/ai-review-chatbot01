const {
  getReviewsByProduct,
  filterReviews
} = require("../services/reviewService");

const { analyzeWithAI } = require("../services/aiService");

const askController = async (req, res) => {
  const { productId, question } = req.body;

  const reviews = getReviewsByProduct(productId);
  const filtered = filterReviews(reviews, question);

  if (filtered.length === 0) {
    return res.json({
      summary: "No relevant reviews found for this question.",
      reviews: []
    });
  }

  try {
    const aiResult = await analyzeWithAI(question, filtered);

    res.json({
      summary: aiResult,
      reviews: filtered.slice(0, 3) // show few for trust
    });

  } catch (err) {
    res.json({
      summary: "AI service failed, showing raw reviews.",
      reviews: filtered.slice(0, 5)
    });
  }
};

module.exports = askController;