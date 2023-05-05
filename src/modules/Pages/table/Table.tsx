import React, { useState, useEffect, ChangeEvent } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { IData, fetchDataAllProduct, filStatus, filterClient } from "../../../redux/reducer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Header from "../../header/Header";
import { TablePagination, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function createData(
  id: number,
  Status: string,
  updatedAt: string,
  Client: string,
  Currency: string,
  Total: number,
  Invoice: string
) {
  return { id, Status, updatedAt, Client, Currency, Total, Invoice };
}

const Tablee = () => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState("");
  const [client, setClient] = React.useState("");
  const [rowsPage, setRowsPage] = useState(5);
  const [page, setPage] = useState(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPage(parseInt(e.target.value, 5));
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchDataAllProduct(document.cookie.split("=")[1]));
  }, [dispatch, status , client]);

  const products = useSelector((state: RootState) => state.Products);

  console.log(products);
  const rows = products.map((product) => {
    return createData(
      product.id,
      product.status,
      product.updatedAt,
      product.client,
      product.currency,
      product.total,
      product.invoice
    );
  });

  const statusOption=[
    { option: "RECEIVED" },
    { option: "PENDING" },
    { option: "FULFILLED" },
    { option: "PROCESSING" },
    { option: "" },
  ]

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
    dispatch(filStatus(e.target.value))
  };
  const handleChangeClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClient(event.target.value);
    dispatch(filterClient(event.target.value))
  }

  return (
    <div
      style={{ textAlign: "center", display: "flex", justifyContent: "center" }}
    >
      <Header />
      <div style={{ marginTop: 50, padding: 50 }}>
        <FormControl style={{ width: 120 }}>
          <TextField onChange={handleStatusChange}
           variant="outlined"
           size="medium"
           select
           label="Status"
           value={status}>
          {statusOption.map((status)=>(
            <MenuItem key={status.option} value={status.option}>{status.option ==="" ?"":status.option}</MenuItem>
          ))}
          </TextField>
         
        </FormControl>
        <TextField style={{marginLeft:5}} value={client} label="Client" variant="outlined" onChange={handleChangeClient}/>
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table sx={{ minWidth: 900 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Invoice</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPage, page * rowsPage + rowsPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.Status}</TableCell>
                    <TableCell>
                      {moment(row.updatedAt).format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell>{row.Client}</TableCell>
                    <TableCell>{row.Currency}</TableCell>
                    <TableCell>
                      {row.Total.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell>{row.Invoice}</TableCell>
                    <TableCell align="center">
                      <Link to={`/detailProduct/${row.id}`}>
                        <Button variant="outlined">View Details</Button>
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/deleteProduct/${row.id}`}>
                        <Button variant="outlined">Delete</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPage}
        />
      </div>
    </div>
  );
};

export default Tablee;
