import * as React from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CookieIcon from "@mui/icons-material/Cookie";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { ColorModeContext } from "../../theme";

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
const DrawerButton = ({ href, icon, text }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      <Link to={href} style={{ textDecoration: "none" }}>
        <Button
          color="primary"
          variant="text"
          startIcon={icon}
          sx={{
            color: theme.palette.text.primary,
            mx: 1.5,
            marginLeft: "15px",
          }}
        >
          <Box >
            <Typography>{text}</Typography>
          </Box>
        </Button>
      </Link>
    </Box>
  );
};
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Sunny's Recipes
      </Typography>
      <Divider />
      <DrawerButton href="/" icon={<HomeIcon />} text="Home" />
      <DrawerButton href="/recipes" icon={<RestaurantIcon />} text="Recipes" />
      <DrawerButton href="/contact" icon={<ContactPageIcon />} text="Contact" />
    </Box>
  );

  const NavbarButton = ({ href, icon, text }) => {
    const theme = useTheme();
    return (
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Link to={href} style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            variant="text"
            startIcon={icon}
            sx={{
              color: theme.palette.text.primary,
              mx: 1.5,
            }}
          >
            <Box>
              <Typography>{text}</Typography>
            </Box>
          </Button>
        </Link>
      </Box>
    );
  };

  const NavbarLogo = () => {
    const theme = useTheme();
    return (
      <Box sx={{ alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            variant="text"
            disableRipple
            startIcon={<CookieIcon />}
            sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent"
              },
              color: theme.palette.text.primary,
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontSize: "2rem",
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
              }}
            >
              Sunny's Recipes
            </Typography>

            <Typography
              variant="h2"
              component="div"
              sx={{
                fontSize: "1.5rem",
                textAlign: "center",
                flexGrow: 1,
                display: { xs: "block", sm: "none" },
              }}
            >
              Sunny's Recipes
            </Typography>
          </Button>
        </Link>
      </Box>
    );
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <AppBar
        component="nav"
        color="default"
        position="fixed"
        sx={{
          border: 0,
          height: "55px",
          boxShadow:
            "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <NavbarLogo />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <NavbarButton href="/" icon={<HomeIcon />} text="Home" />
            <NavbarButton
              href="/recipes"
              icon={<RestaurantIcon />}
              text="Recipes"
            />
            {/* <NavbarButton href="/about" icon={<InfoIcon />} text="About" /> */}
            <NavbarButton
              href="/contact"
              icon={<ContactPageIcon />}
              text="Contact"
            />
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          anchor="top"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;