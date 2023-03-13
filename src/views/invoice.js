import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import moment from 'moment';
import { makeStyles } from '@mui/styles';
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
import { BASE_URL } from '../contants/baseUrl';
import { Typography } from "@mui/material";
import Alert from '@mui/material/Alert';

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
    const classes = useStyles();
    const [isLoadingInv, setIsLoadingInv] = useState(false);
    const [isPayLink, setIsPayLink] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isContact, setIsContact] = useState(false)


    //Get Invoices for logged user
    useEffect(() => {
        setIsLoadingInv(true)
        console.log('user emailllll')
        const { email } = user;
        console.log(email + 'user emailllllafter login')
        setIsContact(false)
        fetch(`${BASE_URL}/api/xero/invoice?email=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
            .then(response => {
                console.log(response.message);
                if (response.status == 404) {
                    console.log('error404')
                    setIsContact(true);
                    setIsLoadingInv(false);

                } else if (response.status == 406) {
                    console.log('error 406')
                } else if (response.status == 500) {
                    console.log('error 500')
                } else {
                    console.log(response)
                    response.json()
                }
            })
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
        fetch(`${BASE_URL}/api/xero/paylink?invoiceId=${slectedInvoiceId}`, {
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
                isContact ? <Alert severity="warning">No contact found for <b>{user.email}</b>. Please contact admin staff for more details.</Alert> :
                    <TableContainer>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Invoice No</StyledTableCell>
                                    <StyledTableCell align="left">Item / description</StyledTableCell>
                                    <StyledTableCell align="left">Total Amount</StyledTableCell>
                                    <StyledTableCell align="left">Due Date</StyledTableCell>
                                    <StyledTableCell align="left">Due Amount</StyledTableCell>
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
                                            <b>{
                                                row.LineItems[0].Item == undefined ? 'Loading' :
                                                    row.LineItems[0].Item.Name
                                            }</b>
                                            <br />
                                            {row.LineItems[0].Description}
                                        </StyledTableCell>
                                        <StyledTableCell align="left"><div style={{ color: '#397d09', fontWeight: '500' }}>{row.Total} {row.CurrencyCode}</div></StyledTableCell>
                                        <StyledTableCell align="left">
                                            {moment(row.DueDate).format("DD/MM/YYYY")}
                                            <br />
                                            {row.AmountDue == 0 ? <Typography variant="caption" className={classes.paidText}>Paid</Typography> : moment(row.DueDate).valueOf() - new Date().getTime() < 0 ?
                                                <Typography variant="caption" style={{ color: 'red', }}>
                                                    Overdue by {moment(new Date()).diff(moment(row.DueDate), 'days')} days
                                                </Typography >
                                                : ''}

                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            <div style={{ color: row.AmountDue == 0 ? '#57c40a' : 'red', fontWeight: '500' }}>
                                                {row.AmountDue} {row.CurrencyCode}
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row.AmountDue == 0 ? (
                                                <Button
                                                    size="small"
                                                    variant="contained"

                                                    onClick={() => { payNowLink(row.InvoiceID) }}
                                                    sx={{ boxShadow: 0 }}
                                                    className={classes.downloadButton}
                                                >Download</Button>
                                            ) : (

                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    onClick={() => { payNowLink(row.InvoiceID) }}
                                                    sx={{ boxShadow: 0 }}
                                                    className={classes.payButton}
                                                >Pay Now</Button>
                                            )}

                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
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

const useStyles = makeStyles({
    payButton: {
        background: '#3f8111 !important',
        minWidth: '94px !important',
        borderRadius: '0px !important',
        "&:hover": {
            boxShadow: 'none !important',
            background: '#0a1c3d !important',
        }
    },

    downloadButton: {
        background: '#eca107 !important',
        minWidth: '94px !important',
        borderRadius: '0px !important',
        "&:hover": {
            boxShadow: 'none !important',
            background: '#0a1c3d !important',
        }
    },
    paidText: {
        background: '#d8ffbd',
        padding: '3px 5px'
    }
});

export default Invoice;