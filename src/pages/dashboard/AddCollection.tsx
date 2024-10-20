import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '@components/dashboard/Header';
import CustomSelect from '@components/dashboard/CustomSelect';
import SearchBar from '@components/dashboard/SearchBar';
import { getAllWasteCollections, getAllUsers, getAllWasteTypes, saveWasteCollection } from '@services/userService'; // Ensure services are imported correctly

// Custom table styling
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#2C4E80",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const AddCollectionPage = () => {
    // State variables for data
    const [wasteCollections, setWasteCollections] = useState([]);
    const [users, setUsers] = useState([]);
    const [wasteTypes, setWasteTypes] = useState([]);

    // State for the selected values in the form
    const [wasteCollectionDTO, setWasteCollectionDTO] = useState({
        userId: '',
        wasteTypeId: '',
        weight: ''
    });

    // Fetch data on page load
    useEffect(() => {
        // Fetch waste collections
        getAllWasteCollections()
            .then((data) => {
                setWasteCollections(data); // Store fetched waste collections
            })
            .catch((error) => {
                console.error("Error fetching waste collections:", error);
            });

        // Fetch users
        getAllUsers()
            .then((data) => {
                console.log("Users data:", data); // Debug log to inspect the data structure
                setUsers(data); // Store fetched users
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });

        // Fetch waste types
        getAllWasteTypes()
            .then((data) => {
                setWasteTypes(data); // Store fetched waste types
            })
            .catch((error) => {
                console.error("Error fetching waste types:", error);
            });
    }, []);

    // Handler for changing input fields
    const handleInputChange = (field: string, value: string) => {
        setWasteCollectionDTO(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Save the waste collection when the button is clicked
    const handleSave = () => {
        if (wasteCollectionDTO.userId && wasteCollectionDTO.wasteTypeId && wasteCollectionDTO.weight) {
            saveWasteCollection(wasteCollectionDTO)
                .then(() => {
                    alert("Waste collection saved successfully!");
                    setWasteCollectionDTO({ userId: '', wasteTypeId: '', weight: '' }); // Reset fields
                })
                .catch(error => {
                    console.error("Error saving waste collection:", error);
                });
        } else {
            alert("Please fill all fields before saving.");
        }
    };

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <Header title="Add Collections" />

            {/* Filters Section */}
            <div className="grid grid-cols-4 gap-4 mt-10">
                {/* User Select */}
                <CustomSelect
                    options={users.map(user => ({
                        label: user.fullName || 'Unnamed User', 
                        value: user.id || 'Unknown' 
                    }))}
                    value={wasteCollectionDTO.userId}
                    onChange={value => handleInputChange('userId', value)}
                    placeholder="Select User"
                />

                {/* Waste Type Select */}
                <CustomSelect
                    options={wasteTypes.map(type => ({
                        label: type.wasteName, 
                        value: type.id
                    }))}
                    value={wasteCollectionDTO.wasteTypeId}
                    onChange={value => handleInputChange('wasteTypeId', value)}
                    placeholder="Select Waste Type"
                />

                {/* Weight Input */}
                <TextField
                    type="number"
                    label="Weight (kg)"
                    value={wasteCollectionDTO.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    fullWidth
                />

                {/* Add Button */}
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Add
                </Button>
            </div>

            {/* Search Bar */}
            <div className="flex justify-end mt-6">
                <SearchBar />
            </div>

            {/* AddCollection Table */}
            <TableContainer component={Paper} className="mt-10">
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>User</StyledTableCell>
                            <StyledTableCell>Waste Type</StyledTableCell>
                            <StyledTableCell>Weight (kg)</StyledTableCell>
                            <StyledTableCell>Collection Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {wasteCollections.map((collection, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{collection.userId}</StyledTableCell>
                                <StyledTableCell>{collection.wasteTypeId}</StyledTableCell>
                                <StyledTableCell>{collection.weight}</StyledTableCell>
                                <StyledTableCell>{new Date(collection.collectionDate).toLocaleString()}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AddCollectionPage;
