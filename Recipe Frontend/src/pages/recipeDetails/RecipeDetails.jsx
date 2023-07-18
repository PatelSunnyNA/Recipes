import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MuiMarkdown from "mui-markdown";
import { useDispatch } from "react-redux";
import { Image } from "mui-image";
const RecipeDetails = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [item, setItem] = useState(null);

  const baseURL = process.env.REACT_APP_BASE_URL;
  async function getRecipe() {
    const response = await fetch(
      `${baseURL}/api/recipes/${slug}?populate=image`,
      {
        method: "GET",
      }
    );
    const itemJson = await response.json();
    setItem(itemJson.data);
    console.log(item);
  }

  useEffect(() => {
    getRecipe();
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item container xs={8}>
          <Grid
            item
            container
            justifyContent="center"
            alignContent="center"
            xs={12}
          >
            <Typography variant="h1">{item?.attributes?.name}</Typography>
          </Grid>
          <Grid item container xs={12}>
            <MuiMarkdown>{item?.attributes?.description}</MuiMarkdown>
          </Grid>
          <Grid item container xs={12} direction="column">
            <Typography>prep time: {item?.attributes?.prepTime} minutes</Typography>
            <Typography>cook time: {item?.attributes?.cookTime} minutes</Typography>
            <Typography>servings: {item?.attributes?.servings}</Typography>
          </Grid>
          <Grid item container xs={4}>
          </Grid>
          <Grid
            container
            item
            xs={4}
            justifyContent="center"
            alignContent="center"
          >
          </Grid>
          <Grid item container xs={13}>
            <MuiMarkdown
              overrides={{
                img: {
                  component: Image,
                  props: {
                    height: "50%",
                    width: "50%",
                    shift: "bottom",
                    shiftduration: "600",
                    duration: "500",
                    style: {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "10px",
                    },
                  },
                },
                p: {
                  component: Typography,
                  props: {
                    style: {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  },
                },
              }}
            >
              {item?.attributes?.ingredients}
            </MuiMarkdown>
          </Grid>
          <Grid item container xs={12}>
            <MuiMarkdown
              overrides={{
                img: {
                  component: Image,
                  props: {
                    height: "50%",
                    width: "50%",
                    shift: "bottom",
                    shiftduration: "600",
                    duration: "500",
                    style: {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "10px",
                    },
                  },
                },
                p: {
                  component: Typography,
                  props: {
                    style: {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  },
                },
              }}
            >
              {item?.attributes?.instructions}
            </MuiMarkdown>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecipeDetails;
