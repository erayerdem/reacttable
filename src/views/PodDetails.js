import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getPodDetails } from '../api/podapi';
import CircularProgress from '@material-ui/core/CircularProgress';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);




const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});


export default function PodDetails() {
    const [podDetails, setPodDetails] = useState([])
    const [isLoading, setİsLoading] = useState(true)

    function MainComponent() {

        return isLoading ? <CircularProgress color="secondary" /> :
    
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
                <TableRow>


                    <StyledTableCell>POD ID </StyledTableCell>
                    <StyledTableCell align="left">INTEGRATION ID</StyledTableCell>
                    <StyledTableCell align="left">ROUTE BUILDER ID&nbsp;</StyledTableCell>
                    <StyledTableCell align="left">API PATH&nbsp;</StyledTableCell>
                    <StyledTableCell align="left">REQUEST CDM OBJECT&nbsp;</StyledTableCell>
                    <StyledTableCell align="left">RESPONSE CDM OBJECT&nbsp;</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {podDetails.map((row) => (
                    <StyledTableRow key={row.apiPath}>
                        <StyledTableCell component="th" scope="row">
                            {row.podid}
                        </StyledTableCell>
                        
                        <StyledTableCell align="left">{row.integrationid}</StyledTableCell>
                        <StyledTableCell align="left">{row.routebuilderid}</StyledTableCell>
                        <StyledTableCell align="left">{row.apiPath}</StyledTableCell>
                        <StyledTableCell align="left">{row.requestCdmObject}</StyledTableCell>
                        <StyledTableCell align="left">{row.responseCdmObject}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>

    }
    useEffect(()  => {

        const poddetailsResult =  getPodDetails()
        poddetailsResult.then(e=> {
           if(e) {
               console.log(e)
               console.log(e)
               setPodDetails(e)
           }
       }).finally(()=> setİsLoading(false))

    }, []);
    const classes = useStyles();

    return (
        <MainComponent/>
    );
}