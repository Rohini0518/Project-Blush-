import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../common/CommonForm";
import { registerFormControls } from "../../config/formConfig";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authSlice";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) =>{ 
      console.log(data)
    if(data?.payload?.success)  navigate("/auth/login")});
    console.log("handlesubmit", formData);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f7ff",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "440px",
          borderRadius: "20px",
          p: "40px 36px 36px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 10px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={3.5}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#1a1a2e",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "-0.5px",
              mb: 1,
            }}
          >
            Create new account
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#8892b0",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/auth/login"
              style={{
                color: "#1a1a2e",
                fontWeight: 700,
                textDecoration: "none",
                borderBottom: "1.5px solid #1a1a2e",
                paddingBottom: "1px",
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>

        {/* Form */}
        <CommonForm
          formControls={registerFormControls}
          buttonText="Sign Up"
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </Paper>
    </Box>
  );
};

export default AuthRegister;
