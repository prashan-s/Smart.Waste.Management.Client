import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItem, Slider, TextField, Card, CardContent } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '@components/client/Button';
import StickyHeader from '@components/common/StickyHeader';
import pay from '@assets/images/pay.png';
import PaymentConfirmation from '@components/client/PaymentConfirmation';

const HOUSEHOLD_PRICE = 2000;
const BUSINESS_PRICE = 5000;

interface FormData {
    type: string;
}

const PaymentPage: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [selectedPlan, setSelectedPlan] = useState('Household');
    const [businessRange, setBusinessRange] = useState(1);
    const [showPayment, setShowPayment] = useState(false);

    const handleBack = () => {
        navigate(-1);
    };

    const handlePlanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPlan(event.target.value);
    };

    const handleBusinessRangeChange = (_event: Event, value: number | number[]) => {
        setBusinessRange(value as number);
    };

    const onSubmit = async (_data: FormData) => {
        setShowPayment(true);
    };

    const price = selectedPlan === 'Household' ? HOUSEHOLD_PRICE : BUSINESS_PRICE * businessRange;

    const goNext = () => {
        setShowPayment(false);
        alert("Payment Successful");
    };

    const goBack = () => {
        setShowPayment(false);
        alert("Payment Cancelled or Failed");
    };

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col px-4 pt-6 pb-28 md:pb-28">
            {showPayment ? (
                <PaymentConfirmation
                    goNext={goNext}
                    goBack={goBack}
                />
            ) : (
                <>
                    {/* Sticky Header */}
                    <StickyHeader
                        title="Payment"
                        onBackClick={handleBack}
                        customClassName="mb-2"
                    />

                    {/* Centered Content */}
                    <div className="flex-grow flex flex-col items-center justify-center px-4 py-4">
                        {/* Display Total Price */}
                        <Card className="w-full max-w-md mb-4 shadow-lg">
                            <CardContent className="flex flex-col items-center">
                                <h1 className="text-4xl font-bold text-black mb-6">
                                    Total Price
                                </h1>
                                <img src={pay} alt="Payment" className="w-16 h-16 mb-6" />
                                <h1 className="text-4xl font-extrabold text-textLightBlack">
                                    LKR {price}
                                </h1>
                                <h1 className="text-gray-500 font-medium">
                                    {selectedPlan} Plan
                                </h1>
                            </CardContent>
                        </Card>

                        {/* Plan Selection */}
                        <Card className="w-full max-w-md mb-4 shadow-lg">
                            <CardContent>
                                <TextField
                                    select
                                    label="Select Plan"
                                    variant="outlined"
                                    fullWidth
                                    {...register('type', { required: 'Please select a plan' })}
                                    error={!!errors.type}
                                    helperText={errors.type ? errors.type.message : ''}
                                    margin="normal"
                                    color="success"
                                    value={selectedPlan}
                                    onChange={handlePlanChange}
                                >
                                    <MenuItem value="Household">Household</MenuItem>
                                    <MenuItem value="Business">Business</MenuItem>
                                </TextField>
                            </CardContent>
                        </Card>

                        {/* Business Plan Range Slider */}
                        {selectedPlan === 'Business' && (
                            <Card className="w-full max-w-md mb-2 shadow-lg">
                                <CardContent>
                                    <h3 className="font-bold mb-8 text-black">
                                        Select Business Range
                                    </h3>
                                    <Slider
                                        value={businessRange}
                                        onChange={handleBusinessRangeChange}
                                        step={1}
                                        marks
                                        min={1}
                                        max={5}
                                        color="success"
                                        valueLabelDisplay="on"
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Pay Button */}
                        <Button
                            label="Pay Now"
                            className="w-full max-w-md bg-tertiary text-white text-lg font-semibold py-3 mt-4 rounded-full shadow-md hover:shadow-lg transition duration-300"
                            onClick={handleSubmit(onSubmit)}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentPage;