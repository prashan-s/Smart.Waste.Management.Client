import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import StickyHeader from '@components/common/StickyHeader';
import Button from '@components/client/Button';
import avatar from '@assets/images/male-avatar.png';
import { fetchUserProfile, updateUserProfile } from '@services/userService'; // Import the service
import { showToast } from '@utils/toastService'; // Import toast utility
import Loader from '@components/common/Loader';

const EditProfilePage: React.FC = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        address: '',
    });

    const [loading, setLoading] = useState(false); // For handling loading state
    const [isFetching, setIsFetching] = useState(true); // For loading initial data

    // Handle input changes
    const handleInputChange = (field: string, value: string) => {
        setProfile({
            ...profile,
            [field]: value,
        });
    };

    // Fetch user profile data on component load
    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const data = await fetchUserProfile();
                setProfile({
                    username: data.fullName || "",
                    email: data.email || "",
                    phoneNumber: data.mobileNumber || "",
                    address: data.address || "",
                });
                setIsFetching(false); // Data loaded
            } catch (error) {
                // Type narrowing for error object
                if (error instanceof Error) {
                    showToast('error', 'Error', error.message || 'Failed to load profile data');
                } else {
                    showToast('error', 'Error', 'Failed to load profile data');
                }
                setIsFetching(false); // Data load failed
            }
        };

        loadUserProfile();
    }, []);

    // Handle form submission
    const handleSubmit = async () => {
        setLoading(true); // Set loading to true while submitting

        const payload = {
            fullName: profile.username,
            email: profile.email,
            mobileNumber: profile.phoneNumber,
            address: profile.address,
        };

        try {
            await updateUserProfile(payload); // Call the API
            showToast('success', 'Success', 'Profile updated successfully!');
        } catch (error) {
            // Type narrowing for error object
            if (error instanceof Error) {
                showToast('error', 'Error', error.message || 'Failed to update profile');
            }
            else {
                showToast('error', 'Error', 'Failed to update profile');
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center px-4 py-6">
            {/* Sticky Header */}
            <StickyHeader
                title="Profile"
                onBackClick={() => navigate(-1)} // Go back to previous page
                customClassName="mb-2"
            />

            {/* Check if fetching data */}
            {isFetching ? (
                <Loader loading={true} />
            ) : (
                <>
                    {/* Profile Avatar and Username */}
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src={avatar} // Use the provided avatar image
                            alt="Avatar"
                            className="w-24 h-24 rounded-full mb-2"
                        />
                        <h3 className="text-lg font-semibold">{profile.username || "Dulanga"}</h3>
                    </div>

                    {/* Edit Profile Fields */}
                    <div className="w-full max-w-md">
                        {/* Username */}
                        <TextField
                            value={profile.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            label="Username"
                            variant="outlined"
                            fullWidth
                            placeholder="Enter your username"
                            margin="normal"
                            color="success"
                            autoComplete="off"
                            InputLabelProps={{
                                shrink: true, sx: {
                                    color: "#404040",
                                    fontSize: 18,
                                    fontWeight: 600,
                                    "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                                }
                            }}
                            inputProps={{
                                style: { backgroundColor: '#ffffff' },
                            }}
                        />

                        {/* Email */}
                        <TextField
                            value={profile.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            placeholder="Enter your email"
                            margin="normal"
                            color="success"
                            autoComplete="off"
                            InputLabelProps={{
                                shrink: true, sx: {
                                    color: "#404040",
                                    fontSize: 18,
                                    fontWeight: 600,
                                    "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                                }
                            }}
                            inputProps={{
                                style: { backgroundColor: '#ffffff' },
                            }}
                        />

                        {/* Mobile Number */}
                        <TextField
                            value={profile.phoneNumber}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            label="Mobile Number"
                            variant="outlined"
                            fullWidth
                            placeholder="Enter your mobile number"
                            margin="normal"
                            color="success"
                            autoComplete="off"
                            InputLabelProps={{
                                shrink: true, sx: {
                                    color: "#404040",
                                    fontSize: 18,
                                    fontWeight: 600,
                                    "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                                }
                            }}
                            inputProps={{
                                style: { backgroundColor: '#ffffff' },
                            }}
                        />

                        {/* Address */}
                        <TextField
                            value={profile.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            label="Address"
                            variant="outlined"
                            fullWidth
                            placeholder="Enter your address"
                            margin="normal"
                            color="success"
                            autoComplete="off"
                            InputLabelProps={{
                                shrink: true, sx: {
                                    color: "#404040",
                                    fontSize: 18,
                                    fontWeight: 600,
                                    "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                                }
                            }}
                            inputProps={{
                                style: { backgroundColor: '#ffffff' },
                            }}
                        />

                        {/* Submit Button */}
                        <div className="w-full mt-6">
                            <Button
                                label={loading ? 'Updating...' : 'Update'}
                                onClick={handleSubmit}
                                className={`w-full ${loading ? 'bg-gray-400' : 'bg-tertiary'} text-white text-lg font-semibold py-2`}
                                loading={loading} // Disable the button while loading
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default EditProfilePage;