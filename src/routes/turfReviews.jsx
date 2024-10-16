import { useLocation, useNavigate } from "react-router-dom"

export default function TurfReview(){
    const location = useLocation();
    const navigate = useNavigate();
    const reviews = location.state.review || null;
    return(<>
         <button onClick={()=>{navigate(-1)}} className=" dark:bg-green-800 bg-green-500 text-white m-2 p-1 rounded-md">Back</button>
        <div className="reviews-container p-5">
        {reviews.map((review, index) => (
          <div key={index} className="review-card p-4 border rounded-lg mb-4 shadow">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">{review.reviewer.username}</h3>
              <span className="text-sm dark:text-gray-300 text-gray-500">{review.createdAt.slice(0,10)}</span>
            </div>
            <div className="rating text-yellow-500">Rating: {review.rating} / 5</div>
            <p className="review-text mt-2">{review.content}</p>
          </div>
        ))}
      </div>
      </>
    )
}