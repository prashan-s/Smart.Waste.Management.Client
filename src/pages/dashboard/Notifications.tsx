import { Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CheckCircleOutline, HourglassEmpty, CancelOutlined, FiberNew } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Header from '@components/dashboard/Header';
import SearchBar from '@components/dashboard/SearchBar';

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
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const NotificationPage = () => {
    // Sample notification data
    const notifications = [
        { id: 1, status: 'Confirmed', count: 25, icon: <CheckCircleOutline className="text-white" />, color: 'green' },
        { id: 2, status: 'Not Confirmed', count: 10, icon: <HourglassEmpty className="text-white" />, color: 'orange' },
        { id: 3, status: 'Cancelled', count: 12, icon: <CancelOutlined className="text-white" />, color: 'red' },
        { id: 4, status: 'New', count: 4, icon: <FiberNew className="text-white" />, color: '#5d0e8b' },
    ];

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <Header title="Notifications" />

            {/* Search Bar */}
            <div className="flex justify-end mt-6">
                <SearchBar />
            </div>

            {/* Notification Table */}
            <TableContainer component={Paper} className="mt-10">
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Data1</StyledTableCell>
                            <StyledTableCell>Data2</StyledTableCell>
                            <StyledTableCell>Data3</StyledTableCell>
                            <StyledTableCell>Data4</StyledTableCell>
                            <StyledTableCell>Data5</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>Value 1-{index + 1}</StyledTableCell>
                                <StyledTableCell>Value 2-{index + 1}</StyledTableCell>
                                <StyledTableCell>Value 3-{index + 1}</StyledTableCell>
                                <StyledTableCell>Value 4-{index + 1}</StyledTableCell>
                                <StyledTableCell>Value 5-{index + 1}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Notification Status Section */}
            <div className="flex justify-around mt-10">
                {notifications.map((notification) => (
                    <Paper
                        key={notification.id}
                        elevation={3}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            // padding: '10px',
                            padding: '10px 0',
                            width: '150px',
                            justifyContent: 'center',
                            backgroundColor: notification.color,
                            color: 'white'
                        }}
                    >
                        {notification.icon}
                        <div className="ml-3">
                            <p className="m-0 text-lg font-bold">{notification.count}</p>
                            <p className="m-0 text-sm font-semibold">{notification.status}</p>
                        </div>
                    </Paper>
                ))}
            </div>
        </div>
    );
};

export default NotificationPage;