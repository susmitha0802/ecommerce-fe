import "./Reviews.css";
import { useQuery } from "react-query";
import axios from "axios";

export const Reviews = ({ id }) => {
  const {data, isLoading, isError} = useQuery(["review-details", id], () => {
    return axios.get(`http://localhost:4000/reviews`);
  })

  if(isLoading) {
    return <h3>Loading...</h3>
  }

  if(isError) {
    return <h3>Error</h3>
  }

  const reviews = data?.data.filter(review => review.prodId === parseInt(id));

  return (
    <div className="flex-variant">
      {
        reviews.map(review => {
          if(review.prodId === parseInt(id)) {
            return (<div className="reviews" key={review.reviewsId}>
              <h3>{review.name}</h3>
              <p>{review.email}</p>
              <p>{review.review}</p>
              <p>Rating: {review.rating}</p>
            </div> );
          }
          return null;   
        })
      }
    </div>
  )
}
