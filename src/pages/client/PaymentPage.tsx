import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItem, Slider, TextField, Card, CardContent } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '@components/client/Button';
import StickyHeader from '@components/common/StickyHeader';
import pay from '@assets/images/pay.png';
import PaymentConfirmation from '@components/client/PaymentConfirmation';
import { showToast } from '@utils/toastService';
import axiosInstance from '@helper/axiosInstance';
import useSessionStorage from '@hooks/useSessionStorage';

const HOUSEHOLD_PRICE = 2000;
const BUSINESS_PRICE = 3000;
const HOUSEHOLD_QUOTA = 50;
const BUSINESS_QUOTA = 250;

interface FormData {
    type: string;
}

const PaymentPage: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [selectedPlan, setSelectedPlan] = useState('Household');
    const [businessRange, setBusinessRange] = useState(0);
    const [showPayment, setShowPayment] = useState(false);
    const [subscriptionFee, setSubscriptionFee] = useSessionStorage('subscriptionFee', null);

    const handleBack = () => {
        navigate(-1);
    };

    const handlePlanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPlan(event.target.value);
    };

    const handleBusinessRangeChange = (_event: Event, value: number | number[]) => {
        setBusinessRange(value as number);
    };

    const formatAmount = (amount: number) => {
        return amount.toFixed(2); // Ensure two decimal places
    };

    const onSubmit = async (_data: FormData) => {
        const businessType = selectedPlan === 'Household' ? 'HOUSE' : 'BUSINESS';
        const volume = selectedPlan === 'Household' ? HOUSEHOLD_QUOTA : businessRange * BUSINESS_QUOTA;
        const fee = selectedPlan === 'Household' ? HOUSEHOLD_PRICE : BUSINESS_PRICE + (businessRange * BUSINESS_QUOTA);
        const formattedSubscriptionFee = formatAmount(fee);
        setSubscriptionFee(formattedSubscriptionFee);

        try {
            // Make the PUT request with query parameters
            await axiosInstance.put(`/user/update-volume`, null, {
                params: {
                    volume,
                    businessType,
                    subscriptionFee: fee,
                }
            });

            setShowPayment(true);
        } catch (error) {
            setShowPayment(false);
            showToast('error', 'Error', 'An error occurred during the payment process');
        }
    };

    const price = formatAmount(selectedPlan === 'Household' ? HOUSEHOLD_PRICE : BUSINESS_PRICE + (businessRange * BUSINESS_QUOTA));
    const totalBusinessVolume = businessRange * BUSINESS_QUOTA;

    const goNext = () => {
        setShowPayment(false);
        showToast('success', 'Success', 'Payment Successful');
        navigate('/client/payment-status', { state: { isPaymentSuccessful: true } });
    };

    const goBack = () => {
        setShowPayment(false);
        showToast('info', 'Info', 'Payment Cancelled');
    };

    const onPaymentError = () => {
        setShowPayment(false);
        showToast('info', 'Info', 'Payment Failed');
        navigate('/client/payment-status', { state: { isPaymentSuccessful: false } });
    }

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col px-4 pt-6 pb-28 md:pb-28">
            {showPayment ? (
                <PaymentConfirmation
                    amount={subscriptionFee.toString()}
                    goNext={goNext}
                    goBack={goBack}
                    onPaymentError={onPaymentError}
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
                                        min={0}
                                        max={4}
                                        color="success"
                                        valueLabelDisplay="on"
                                    />
                                    {/* Display the calculated KG below the slider */}
                                    <h1 className="font-bold text-2xl text-center">
                                        Quota : {totalBusinessVolume == 0 ? 100 : totalBusinessVolume} Kg
                                    </h1>
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