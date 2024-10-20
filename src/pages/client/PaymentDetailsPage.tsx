import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import StickyHeader from '@components/common/StickyHeader';
import cardImage from '@assets/images/credit-cards.png';
import visa from '@assets/images/visa.png';
import {
    Skeleton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material';
import {
    getPaymentHistory,
    deleteCard,
    UserCardInfo,
    UserPaymentHistory,
} from '@services/paymentService';

const PaymentDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const [paymentHistory, setPaymentHistory] = useState<UserPaymentHistory[]>([]);
    const [userCards, setUserCards] = useState<UserCardInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // State for confirmation dialog
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
    const [cardToDelete, setCardToDelete] = useState<string | null>(null);

    const handleBack = () => {
        navigate(-1);
    };

    const handleDeleteCard = (cardId: string) => {
        setCardToDelete(cardId);
        setOpenConfirmDialog(true);
    };

    const confirmDeleteCard = async () => {
        if (cardToDelete) {
            try {
                setLoading(true);
                await deleteCard(cardToDelete);
                setUserCards((prevCards) => prevCards.filter((card) => card.id !== cardToDelete));
                setOpenConfirmDialog(false);
                setCardToDelete(null);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCancelDelete = () => {
        setOpenConfirmDialog(false);
        setCardToDelete(null);
    };

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const data = await getPaymentHistory();
                setPaymentHistory(data.userPaymentHistory);
                setUserCards(data.userCardInfo);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentHistory();
    }, []);

    return (
        <div className="min-h-screen bg-[#EBF9EC] flex flex-col items-center justify-start px-4 pt-6 pb-28 md:pb-28">
            {/* Reusable Sticky Header */}
            <StickyHeader
                title="Payments"
                onBackClick={handleBack}
                customClassName="mb-2"
            />

            {/* Card Image Header */}
            <div className="mb-2 w-full max-w-md">
                {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={288} />
                ) : (
                    <img
                        src={cardImage}
                        alt="card image"
                        className="w-full h-72 md:h-64 object-cover rounded-lg"
                    />
                )}
            </div>

            {/* Payment Method */}
            <div className="w-full max-w-md mb-6 bg-white rounded-lg p-4 shadow-lg">
                <h3 className="text-lg font-bold mb-3">Payment Method</h3>
                {error && <p className="text-red-500">{error}</p>}
                {loading ? (
                    <Skeleton variant="rectangular" height={80} />
                ) : userCards.length > 0 ? (
                    userCards.map((card) => (
                        <div
                            key={card.id}
                            className="flex justify-between items-center p-3 border border-gray-200 rounded-lg mb-3"
                        >
                            <div className="flex items-center">
                                <img src={visa} alt="Card" className="w-16 h-8 mr-3" />
                                <div>
                                    <h4 className="text-lg font-bold">{card.cardHolderName}</h4>
                                    <p className="text-sm text-gray-500">
                                        {card.cardNumber.replace(/\d{12}(\d{4})/, '**** **** **** $1')}
                                    </p>
                                    <p className="text-sm text-gray-500">Expiry: {card.cardExpiryDate}</p>
                                </div>
                            </div>
                            <FiTrash2
                                className="text-red-600 cursor-pointer"
                                size={24}
                                onClick={() => handleDeleteCard(card.id)}
                                title="Delete Card"
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No saved payment methods.</p>
                )}
            </div>

            {/* Payment History */}
            <div className="w-full max-w-md bg-white rounded-lg p-4 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Payment History</h3>
                {loading ? (
                    // ... existing skeleton loaders ...
                    <div>Loading...</div>
                ) : paymentHistory.length > 0 ? (
                    paymentHistory.map((payment) => (
                        <div
                            key={payment.id}
                            className="flex justify-between items-center mb-3"
                        >
                            <div className="flex items-center">
                                <div className="bg-[#EBF9EC] w-12 h-12 rounded-lg flex flex-col items-center justify-center">
                                    <h4 className="text-lg font-bold text-center">
                                        {new Date(payment.paymentDate).getDate()}
                                    </h4>
                                    <p className="text-sm text-center">
                                        {new Date(payment.paymentDate).toLocaleString('default', {
                                            month: 'short',
                                        })}
                                    </p>
                                </div>
                                <div className="ml-4">
                                    <p className="font-medium">{payment.title}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(payment.paymentDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <p className="text-lg font-semibold">
                                Rs.{parseFloat(payment.amount.toString()).toFixed(2)}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No payment history available.</p>
                )}
            </div>

            {/* Confirmation Dialog */}
            <Dialog
                open={openConfirmDialog}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Payment Method"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this payment method? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDeleteCard} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PaymentDetailsPage;