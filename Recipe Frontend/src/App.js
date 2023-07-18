import { useEffect } from "react";
import {  Routes, Route, useLocation } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Home from "./pages/home/Home";
import Navbar from "./pages/global/Navbar";
import Recipes from "./pages/recipes/Recipes";
import RecipeDetails from "./pages/recipeDetails/RecipeDetails";
import Contact from "./pages/contact/Contact";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <ScrollToTop />
          <Navbar />
          <main className="content">
            <Box mx="20px" my="75px">
              <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/recipes" element={<Recipes/>}/>
                <Route path="/recipes/:slug" element={<RecipeDetails/>}/>
                <Route path="/contact" element={<Contact/>}/>
              </Routes>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
