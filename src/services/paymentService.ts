import axiosInstance from '@helper/axiosInstance';

// Define TypeScript interfaces based on your API response schema
export interface UserCardInfo {
    id: string;
    userId: string;
    cardHolderName: string;
    cardNumber: string;
    cardExpiryDate: string;
}

export interface UserPaymentHistory {
    id: string;
    userId: string;
    amount: number;
    title: string;
    paymentDate: string; // ISO date string
}

export interface PaymentHistoryResponse {
    userCardInfo: UserCardInfo[];
    userPaymentHistory: UserPaymentHistory[];
}

// Function to fetch payment history
export const getPaymentHistory = async (): Promise<PaymentHistoryResponse> => {
    try {
        const response = await axiosInstance.get('/payment/history');
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || 'Failed to fetch payment history';
    }
};

// Function to delete a card
export const deleteCard = async (cardId: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/payment/delete/${cardId}`);
    } catch (error: any) {
        throw error.response?.data?.message || 'Failed to delete card';
    }
};