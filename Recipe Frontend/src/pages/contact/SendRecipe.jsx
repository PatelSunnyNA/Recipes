import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const SendRecipe = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
const baseURL = process.env.REACT_APP_BASE_URL
  const handleFormSubmit = (values,{resetForm}) => {
    console.log(values);
    fetch(`${baseURL}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          name: values.senderName,
          email: values.email,
          title: values.title,
          yield: values.yield,
          instructions: values.instructions,
          ingredients: values.ingredients,
        },
      }),
    })
      .then((response) => response.json())
      
      
  };

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box width={{ xs: "90%", md: "80%" }}>
          <Grid align="center" item container>
            <Grid item xs={12} md={12}>
              <Typography variant="h1" my="10px">Submit A Recipe</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Formik
                onSubmit={(values,{resetForm})=>{
    fetch(`${baseURL}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          name: values.senderName,
          email: values.email,
          title: values.title,
          yield: values.yield,
          instructions: values.instructions,
          ingredients: values.ingredients,
        },
      }),
    })
      .then((response) => response.json())
      resetForm()
                }}
                initialValues={initialValues}
                validationSchema={messageSchema}
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
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 4",
                        },
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.senderName}
                        name="senderName"
                        error={!!touched.senderName && !!errors.senderName}
                        helperText={touched.senderName && errors.senderName}
                        sx={{ gridColumn: "span 4" }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Recipe Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.title}
                        name="title"
                        error={!!touched.title && !!errors.title}
                        helperText={touched.title && errors.title}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Yield"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.yield}
                        name="yield"
                        error={!!touched.yield && !!errors.yield}
                        helperText={touched.yield && errors.yield}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        multiline
                        minRows={4}
                        label="Ingredients"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.ingredients}
                        name="ingredients"
                        error={!!touched.ingredients && !!errors.ingredients}
                        helperText={touched.ingredients && errors.ingredients}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        multiline
                        minRows={4}
                        label="Instructions"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.instructions}
                        name="instructions"
                        error={!!touched.instructions && !!errors.instructions}
                        helperText={touched.instructions && errors.instructions}
                        sx={{ gridColumn: "span 4" }}
                      />
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                      >
                        Send Message
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

const messageSchema = yup.object().shape({
  senderName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  title: yup.string().required("required"),
  yield: yup.string().required("required"),
  instructions: yup.string().required("required"),
  ingredients: yup.string().required("required"),
});
const initialValues = {
  senderName: "",
  email: "",
  title: "",
  yield: "",
  instructions: "",
  ingredients: "",
};

export default SendRecipe;
