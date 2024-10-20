import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import StickyHeader from '@components/common/StickyHeader';
import Rating from '@components/client/Rating';
import Button from '@components/client/Button';
import { useNavigate } from 'react-router-dom';

// Validation schema
const schema = yup.object().shape({
    comment: yup.string().required('Comment is required'),
});

// Define the form fields
interface IFeedbackForm {
    comment: string;
}

const FeedbackPage: React.FC = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0); // State to handle rating selection

    // Form setup with useForm and Yup resolver
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFeedbackForm>({
        resolver: yupResolver(schema),
    });

    // Handle rating change
    const handleRatingChange = (value: number) => {
        setRating(value);
    };

    // Form submission handler
    const onSubmit: SubmitHandler<IFeedbackForm> = (data) => {
        console.log('Feedback Submitted:', { comment: data.comment, rating });
        // Handle feedback submission logic here
        navigate('/client/feedback-success');
    };

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center px-2 py-8">
            {/* Sticky Header */}
            <StickyHeader title="Feedbacks" onBackClick={() => navigate(-1)} />

            {/* Instruction */}
            <div className="w-full max-w-md text-center mt-4">
                <h2 className="text-lg font-bold mb-2">Let us know about your experience!</h2>
            </div>

            {/* Rating Component */}
            <div className="w-full max-w-md flex justify-center mt-4">
                <Rating rating={rating} onRatingChange={handleRatingChange} />
            </div>

            {/* Comment Input Field */}
            <div className="w-full max-w-md mt-6 px-3">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        {...register('comment')}
                        label="Add your comments..."
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        error={!!errors.comment}
                        helperText={errors.comment ? errors.comment.message : ''}
                        InputProps={{
                            style: { backgroundColor: '#ffffff', borderRadius: '8px' },
                        }}
                    />

                    {/* Submit Button */}
                    <div className="w-full mt-6">
                        <Button label="Send" className="w-full bg-tertiary text-white text-lg font-semibold py-2" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackPage;