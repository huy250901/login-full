import {
  Button,
  Container,
  Dialog,
  Divider,
  Typography,
  Box,
  TextField,
  MenuItem,
  Input,
} from "@material-ui/core";
import { useParams, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import React, { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import {
  fetchDataProductById,
  fetchUpdateProduct,
} from "../../../redux/reducer";
const Update = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { index } = useParams();
  useEffect(() => {
    dispatch(
      fetchDataProductById({ id: index, token: document.cookie.split("=")[1] })
    );
  }, [dispatch]);

  const options = [
    { value: "RECEIVED" },
    { value: "PENDING" },
    { value: "FULFILLED" },
    { value: "PROCESSING" },
  ];
  const value = useSelector((state: RootState) => state.ProductByID);
  const [status, setStatus] = useState("");
  const [total, setTotal] = useState("");
  const totalFormat = Number(total);
  const id = Number(index);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };
  const handleUpdate = () => {
    // update field status & total
    dispatch(
      fetchUpdateProduct({
        id: id,
        order: value.order,
        status: status,
        currency: value.currency,
        total: totalFormat,
        fundingMethod: value.fundingMethod,
        token: document.cookie.split("=")[1],
      })
    );
    navigate("/table");
    window.location.reload();
  }
  return (
    <div>
        {!!value && (
        <Dialog open={true} fullWidth={true}>
          <Container maxWidth="sm" style={{ backgroundColor: "white" }}>
            <Typography
              variant="h6"
              style={{
                padding: "10px 0px ",
                fontWeight: "bold",
                color: "#1b3e67",
              }}
            >
              Update value
            </Typography>
            <Divider />
            <Box>
              <section>
                <TextField
                  style={{ margin: "10px" }}
                  select
                  fullWidth
                  label="Status"
                  value={status || ""}
                  onChange={handleChange}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </section>
              <section>
                <TextField
                  disabled
                  fullWidth
                  label="Date"
                  value={moment(`${value.createdAt}`).format("DD MMM YYYY")}
                ></TextField>
              </section>
              <section>
                <TextField
                  value={value.client || ""}
                  disabled
                  fullWidth
                  label="Client"
                ></TextField>
              </section>
              <section>
                <TextField
                  disabled
                  value={value.currency || ""}
                  fullWidth
                  label="Currency"
                />
              </section>
              <section>
                <TextField
                  value={total || ""}
                  fullWidth
                  onChange={(e) => setTotal(e.target.value)}
                  label="Total"
                ></TextField>
              </section>
              <section>
                <TextField
                  disabled
                  value={value.invoice || ""}
                  fullWidth
                  label="Invoice"
                ></TextField>
              </section>
            </Box>
            <Divider />
            <Box sx={{ padding: "15px 0" }}>
              <Button
                variant="contained"
                onClick={(e) => navigate("/table")}
                style={{
                  color: "#1b3e67",
                  fontWeight: "750",
                  backgroundImage: "linear-gradient(0, #ded9d9, #fff)",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleUpdate}
                style={{
                  color: "#fff",
                  fontWeight: "750",
                  backgroundColor: "blue",
                  textTransform: "capitalize",
                  float: "right",
                  paddingLeft: "34px",
                }}
              >
                Update
              </Button>
            </Box>
          </Container>
        </Dialog>
      )}
    </div>
  )
  
};

export default Update;
