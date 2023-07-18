import React, { useEffect } from "react";
import { Box, useTheme, Typography, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../../state";
import PreviewCard from "./PreviewCard";
const Preview = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const theme = useTheme();
  const items = useSelector((state) => state.recipe.items);
  const dispatch = useDispatch();
  async function getItems() {
    const items = await fetch(
      `${baseURL}/api/recipes?pagination[start]=0&pagination[limit]=3&populate=image`,
      { method: "GET" }
    );
    const itemsJson = await items.json();
    dispatch(setRecipes(itemsJson.data));
  }
  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box
      marginBottom="25px"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box mt="20px">
        <Typography variant="h2">Latest Recipes</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid
          container
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          {items?.map((item, i) => (
            <Grid item my="20px" xs={12} sm={12} md={4} key={i}>
              <PreviewCard
                key={i}
                author={item.attributes.author}
                description={item.attributes.shortDescription}
                imageURL={baseURL +`${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                servings={item.attributes.servings}
                slug={"/recipes/" + item.attributes.slug}
                name={item.attributes.name}
                totalTime={item.attributes.cookTime + item.attributes.prepTime}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box>
        <Link to="/recipes" style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            variant="outlined"
            sx={{
              color: theme.palette.text.primary,
              mx: 1.5,
              mb: 1.5,
            }}
          >
            <Box>
              <Typography>All Recipes</Typography>
            </Box>
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Preview;
