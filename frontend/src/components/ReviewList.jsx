

function ReviewList({ reviews }) {
  // safety check
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="reviews">
      <strong>Supporting Reviews:</strong>

      {reviews.map((r, i) => (
        <div key={i}>• {r}</div>
      ))}
    </div>
  );
}

export default ReviewList;