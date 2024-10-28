import { useLocation, useNavigate } from "react-router-dom";

export default function TurfReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const reviews = location.state.review || null;
  return (
    <>
      <div className=" dark:bg-slate-900">
        <div className="p-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-green-500 text-white w-10 h-10 rounded-md shadow-md flex justify-center items-center hover:bg-green-600 transition duration-200"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>

        <div className="reviews-container max-w-3xl mx-auto p-5">
          <h2 className="text-2xl font-semibold text-center mb-6 dark:text-gray-300">
            User Reviews
          </h2>

          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div
                key={index}
                className="review-card bg-white dark:bg-gray-800 p-6 border rounded-lg mb-6 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold dark:text-gray-200">
                    {review.reviewer.username}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="ml-1 text-yellow-500 font-medium">
                    {review.rating} / 5
                  </span>
                </div>
                <p className="review-text text-gray-700 dark:text-gray-300">
                  {review.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No reviews available yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
