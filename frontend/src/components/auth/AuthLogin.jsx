import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../common/CommonForm";
import { loginFormControls } from "../../config/formConfig";
import { loginUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("entered-formdata", formData);
      const result = await dispatch(loginUser(formData)).unwrap();

      console.log(result?.success, "resultsucces");
      console.log(result, "just complete result");

      if (result?.success) {
        navigate("/");
        console.log("success login");
      } else {
        console.log("auth failed");
      }
    } catch (error) {
      alert("Login Failed");
      console.log("login Failed-error",error);
    }
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
            Log In
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#8892b0",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              style={{
                color: "#1a1a2e",
                fontWeight: 700,
                textDecoration: "none",
                borderBottom: "1.5px solid #1a1a2e",
                paddingBottom: "1px",
              }}
            >
              Register
            </Link>
          </Typography>
        </Box>

        <CommonForm
          formControls={loginFormControls}
          buttonText="Log In"
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </Paper>
    </Box>
  );
};

export default AuthLogin;
