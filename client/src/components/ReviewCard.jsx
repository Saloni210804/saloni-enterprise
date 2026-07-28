export default function ReviewCard({ review }) {
 const { stars, text, author, role } = review

 return (
 <div className="review-card">
 <div className="review-card__stars">{'★'.repeat(stars)}</div>
 <p className="review-card__text">"{text}"</p>
 <div>
 <div className="review-card__author">{author}</div>
 <div className="review-card__role">{role}</div>
 </div>
 </div>
 )
}
