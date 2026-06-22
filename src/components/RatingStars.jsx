import React from 'react';
import './RatingStars.css';
import { Star } from 'lucide-react';

export default function RatingStars({ value, compact = false }) {
  const fullStars = Math.floor(value);

  return (
    <div className={`rating-stars ${compact ? 'compact-rating' : ''}`}>
      {compact ? (
        <Star className="star-icon filled" />
      ) : (
        [1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`star-icon ${star <= fullStars ? 'filled' : ''}`} />
        ))
      )}
      <span>{value.toFixed(1)}</span>
    </div>
  );
}
