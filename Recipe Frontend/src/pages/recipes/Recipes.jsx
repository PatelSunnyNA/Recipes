import React, { useEffect, useState } from "react";
import { Box, useTheme, Typography, Grid, Tabs, Tab } from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../../state";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import RecipeCard from "../../components/RecipeCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
const Recipes = () => {
  const theme = useTheme();
  const items = useSelector((state) => state.recipe.items);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const breakPoint = useMediaQuery("(min-width:600px)");
  const recipesPerPage = 6;
  const pageNumbers = [];

  const baseURL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  async function getItems() {
    const items = await fetch(
      `${baseURL}/api/recipes?populate=image&sort[0]=publishedAt%3Adesc`,
      { method: "GET" }
    );
    const itemsJson = await items.json();
    dispatch(setRecipes(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  const recipeData = React.useMemo(() => {
    let computedRecipes = items;

    if (sortFilter === "newest") {
    }
    if (sortFilter === "oldest") {
    }
    if (currentTab === "all") {
      computedRecipes = items;
    }
    if (currentTab === "food") {
      computedRecipes = computedRecipes.filter((item) =>
        item.attributes.type.toLowerCase().includes(currentTab.toLowerCase())
      );

      setCurrentPage(1);
    }
    if (currentTab === "drink") {
      computedRecipes = computedRecipes.filter((item) =>
        item.attributes.type.toLowerCase().includes(currentTab.toLowerCase())
      );

      setCurrentPage(1);
    }
    if (currentTab === "favorite") {
      let favoriteList = JSON.parse(localStorage.getItem("favorites") || "[]");
      computedRecipes = computedRecipes.filter((item) =>
        favoriteList.includes(item.attributes.slug)
      );

      setCurrentPage(1);
    }
    if (searchTerm) {
      computedRecipes = computedRecipes.filter((item) =>
        item.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setTotalRecipes(computedRecipes.length);

    //Current Page slice
    return computedRecipes.slice(
      (currentPage - 1) * recipesPerPage,
      (currentPage - 1) * recipesPerPage + recipesPerPage
    );
  }, [items, currentPage, searchTerm, currentTab]);
  // Change page
  const paginate = (event, value) => setCurrentPage(value);

  const resetFilter = () => {
    setSearchTerm("");
    setSortFilter("");
    setCurrentPage(1);
  };
  return (
    <Box width={1} margin="0 auto" paddingX={2} paddingY={2}>
      <Box display="flex" width={1} alignItems="center" justifyContent="center">
        <Grid container spacing={2}>
          <Grid item container justifyContent="center">
            <Grid item xs={12} md={5}>
              <Box alignItems="center" justifyContent="center">
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Recipes"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    value={searchTerm}
                  />
                  {searchTerm === "" && (
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                      disabled
                    >
                      <SearchIcon />
                    </IconButton>
                  )}
                  {searchTerm !== "" && (
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                      onClick={resetFilter}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {breakPoint ? (
                <Tabs
                  textColor="primary"
                  indicatorColor="secondary"
                  value={currentTab}
                  onChange={handleChange}
                  centered
                >
                  <Tab label="ALL" value="all" />
                  <Tab label="FOOD" value="food" />
                  <Tab label="DRINKS" value="drink" />
                  <Tab label="FAVORITES" value="favorite" />
                </Tabs>
              ) : (
                <Tabs
                  textColor="primary"
                  indicatorColor="secondary"
                  value={currentTab}
                  onChange={handleChange}
                  centered
                  variant="fullWidth"
                >
                  <Tab label="ALL" value="all" />
                  <Tab label="FOOD" value="food" />
                  <Tab label="DRINKS" value="drink" />
                  <Tab label="FAVORITES" value="favorite" />
                </Tabs>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            xs={12}
            sm={12}
            md={12}
          >
            <Grid
              item
              container
              spacing={4}
              justifyContent="flex-start"
              alignItems="center"
            >
              {recipeData.map((item, i) => (
                <Grid item xs={12} sm={12} md={4} key={i}>
                  <RecipeCard
                    key={i}
                    author={item.attributes.author}
                    description={item.attributes.shortDescription}
                    imageURL={`${baseURL}${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                    servings={item.attributes.servings}
                    slug={item.attributes.slug}
                    name={item.attributes.name}
                    totalTime={
                      item.attributes.cookTime + item.attributes.prepTime
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {pageNumbers.length > 1 && (
              <Box my="10px" sx={{ display: "flex", justifyContent: "center" }}>
                <Stack spacing={2}>
                  <Pagination
                    count={pageNumbers.length}
                    page={currentPage}
                    onChange={paginate}
                  />
                </Stack>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Recipes;
