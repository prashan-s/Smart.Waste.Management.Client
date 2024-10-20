import useSessionStorage from "@hooks/useSessionStorage";
import Payment from "@components/common/Payment";

// Function to generate random order ID
const generateOrderId = () => {
    return Math.floor(100000 + Math.random() * 900000); // Random 6-digit order ID
};

const PaymentConfirmation = ({ amount, goNext, goBack, onPaymentError }: { amount: string, goNext: () => void, goBack: () => void, onPaymentError: () => void }) => {

    const paymentTitle = "Urban Eco";
    const currency = "LKR";
    const orderId = generateOrderId(); // Generate random order ID for each payment

    const [userData,] = useSessionStorage('userData', null);

    const customerDetails = {
        firstName: userData?.fullName,
        lastName: userData?.fullName,
        email: userData?.email,
        phone: userData?.mobileNumber,
        address: userData?.address,
        city: userData?.address,
    };

    return (
        <Payment
            paymentTitle={paymentTitle}
            amount={amount}
            currency={currency}
            userId={userData.id}
            order_id={orderId}
            customerDetails={customerDetails}
            goNext={goNext}
            goBack={goBack}
            onPaymentError={onPaymentError}
        ></Payment>
    )
}

export default PaymentConfirmation