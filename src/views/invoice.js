import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import moment from 'moment';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from '@mui/material/TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#0a1c3d',
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
    // '&:last-child td, &:last-child th': {
    //     border: 0,
    // },
}));


const Invoice = () => {
    const [isLoadingInv, setIsLoadingInv] = useState(false);
    const [isPayLink, setIsPayLink] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);


    //Get Invoices for logged user
    useEffect(() => {
        setIsLoadingInv(true)
        console.log('user emailllll')
        const { email } = user;
        console.log(email + 'user emailllllafter login')
        fetch(`http://localhost:3000/api/xero/invoice?email=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // handle response data
                console.log(data.Invoices);
                setInvoices(data.Invoices);
                setIsLoadingInv(false);
            })
            .catch(error => {
                // handle error
                console.log('Error while fetching' + error)
            });
    }, []);
    //Get Invoices for logged user end

    //Generate pay now link
    const payNowLink = (slectedInvoiceId) => {
        console.log(slectedInvoiceId);
        setIsPayLink(true)
        fetch(`http://localhost:3000/api/xero/paylink?invoiceId=${slectedInvoiceId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // handle response data
                console.log(data.OnlineInvoices[0].OnlineInvoiceUrl);
                window.open(data.OnlineInvoices[0].OnlineInvoiceUrl, '_blank', 'noreferrer')

            }).then(() => setIsPayLink(false))
            .catch(error => {
                // handle error
                console.log('Error while fetching' + error)
            });
    }
    // Generate pay now link end

    // Table pagination functions

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //Table pagination functions end


    const { user, isAuthenticated, isLoading } = useAuth0();
    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            isLoadingInv ?
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress />
                </div>
                :
                <TableContainer>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Invoice No</StyledTableCell>
                                <StyledTableCell align="left">Item / description</StyledTableCell>
                                <StyledTableCell align="left">Total Amount</StyledTableCell>
                                <StyledTableCell align="left">Due Date</StyledTableCell>
                                <StyledTableCell align="left">Pay Invoice</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <StyledTableRow key={row.InvoiceID}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.InvoiceNumber}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <b>{row.LineItems[0].Item.Name}</b>
                                        <br />
                                        {row.LineItems[0].Description}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.Total} {row.CurrencyCode}</StyledTableCell>
                                    <StyledTableCell align="left">{moment(row.DueDate).format("DD/MM/YYYY")}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Button
                                            size="small"
                                            variant="contained"
                                            style={{ background: '#57c40a', borderRadius: '0px' }}
                                            onClick={() => { payNowLink(row.InvoiceID) }}
                                            sx={{ boxShadow: 0 }}
                                        >
                                            Pay Now
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[2, 5, 10]}
                        component="div"
                        count={invoices.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
        )
    );
};

export default Invoice;