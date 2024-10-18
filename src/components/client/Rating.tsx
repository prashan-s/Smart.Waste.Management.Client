import React from 'react';

interface RatingComponentProps {
    rating: number;
    onRatingChange: (value: number) => void;
}

const emojis = ['😡', '😠', '😐', '😊', '😁'];

const Rating: React.FC<RatingComponentProps> = ({ rating, onRatingChange }) => {
    return (
        <div className="flex justify-center space-x-4">
            {emojis.map((emoji, index) => (
                <button
                    key={index}
                    type="button"
                    className={`text-4xl ${index === rating ? 'opacity-100' : 'opacity-50'} focus:outline-none`}
                    onClick={() => onRatingChange(index)}
                >
                    {emoji}
                </button>
            ))}
        </div>
    );
};

export default Rating;