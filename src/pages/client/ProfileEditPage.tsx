import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import StickyHeader from '@components/common/StickyHeader';
import Button from '@components/client/Button';
import avatar from '@assets/images/male-avatar.png'

const EditProfilePage: React.FC = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        address: '',
    });

    // Handle input changes
    const handleInputChange = (field: string, value: string) => {
        setProfile({
            ...profile,
            [field]: value,
        });
    };

    // Handle form submission
    const handleSubmit = () => {
        console.log('Profile Updated:', profile);
        // Implement your form submission logic here
    };

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center px-4 py-6">
            {/* Sticky Header */}
            <StickyHeader
                title="Profile"
                onBackClick={() => navigate(-1)} // Go back to previous page
                customClassName="mb-2"
            />

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

                {/* Password */}
                <TextField
                    value={profile.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    placeholder="************"
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
                        label="Update"
                        onClick={handleSubmit}
                        className="w-full bg-tertiary text-white text-lg font-semibold py-2"
                    />
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;