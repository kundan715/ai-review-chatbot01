const axios = require("axios");

const analyzeWithAI = async (question, reviews) => {
  const res = await axios.post("http://localhost:8000/analyze", {
    question,
    reviews
  });

  return res.data.result;
};

module.exports = { analyzeWithAI };