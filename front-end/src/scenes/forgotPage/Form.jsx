import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const forgotSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
});
const defaultForgetValues = {
  email: "",
};

const Form = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  const sendRegisterEmail = async (values, onSubmitProps) => {
    await fetch("http://localhost:8002/auth/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    onSubmitProps.resetForm();
    navigate("/login");
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    sendRegisterEmail(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={defaultForgetValues}
      validationSchema={forgotSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="40px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: "span 4" },
            }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}

          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { backgroundColor: palette.primary.dark },
              }}
            >
              {"SEND"}
            </Button>

            <Typography
              onClick={() => navigate("/login")}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.dark,
                },
              }}
            >
              {"Already have an account? Login here."}
            </Typography>

            <Typography
              onClick={() => navigate("/reset")}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.dark,
                },
              }}
            >
              {"Reset password"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
