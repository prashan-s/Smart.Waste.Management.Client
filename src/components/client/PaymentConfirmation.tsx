import { useState } from "react";
import useSessionStorage from "@hooks/useSessionStorage";
import Payment from "@components/common/Payment";

const PaymentConfirmation = ({ goNext, goBack, onPaymentError }: { goNext: () => void, goBack: () => void, onPaymentError: () => void }) => {

    const paymentTitle = "Urban Eco";
    const currency = "LKR";

    const [amount,] = useState("100.00");
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
            order_id={1}
            customerDetails={customerDetails}
            goNext={goNext}
            goBack={goBack}
            onPaymentError={onPaymentError}
        ></Payment>
    )
}

export default PaymentConfirmation