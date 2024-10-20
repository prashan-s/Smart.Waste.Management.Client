import { useState } from "react";
import useSessionStorage from "@hooks/useSessionStorage";
import Payment from "@components/common/Payment";
// const PaymentConfirmation = ({ finishOrder, goBack }) => {
const PaymentConfirmation = ({ goNext, goBack }: { goNext: () => void, goBack: () => void }) => {

    const paymentTitle = "Smart Waste Management System";
    const currency = "LKR";

    const [orderDetails,] = useSessionStorage('order-details', null);
    const [amount, setAmount] = useState(100);
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
            order_id={1}
            customerDetails={customerDetails}
            goNext={goNext}
            goBack={goBack}
        ></Payment>
    )
}

export default PaymentConfirmation