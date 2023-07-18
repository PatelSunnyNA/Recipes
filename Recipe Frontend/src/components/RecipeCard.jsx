import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  CardHeader,
  Typography,
  Box,
  useTheme,
  Grid,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteButton from "./FavoriteButton";
import LinkIcon from "@mui/icons-material/Link";


const timeToStringDisplay = (time) => {
  const mins = time % 60;
  const hours = Math.floor(time / 60);
  let hourString = `00`;
  let minString = `:00`;
  if (mins < 10) {
    minString = `:0${mins}`;
  } else {
    minString = `:${mins}`;
  }
  if (hours < 10) {
    hourString = `0${hours}`;
  } else {
    hourString = `${hours}`;
  }
  const timeInString = hourString + minString;
  return timeInString;
};

export default function RecipeCard({
  author,
  created,
  description,
  imageURL,
  servings,
  slug,
  name,
  totalTime,
}) {
  const theme = useTheme();
  const recipeURL = "/recipes/" + slug;
  const time = timeToStringDisplay(totalTime);
  return (
    <Box>
      <Card>
        <Grid container>
          <Grid item xs={12}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              sx={{ textAlign: "center", alignContent: "center" }}
              title={name}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                mx: "10px",
                my: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography variant="h5" color="textSecondary">
                  {time}
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{ display: "flex", alignItems: "center", ml: "2px" }}
                >
                  <AccessTimeIcon />
                </Typography>
              </Box>
              <Typography color="textSecondary" variant="h5">
                {servings}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <CardActionArea component={Link} to={slug}>
              <CardMedia
                component="img"
                color="textSecondary"
                height="400"
                image={imageURL}
              />
            </CardActionArea>
          </Grid>
          <Grid item xs={12}> {/**/}
            <CardContent>
              <Typography color="text" variant="h5" sx={{ height: 25 }}>
                {description}
              </Typography>
            </CardContent>
          </Grid>

          <Grid item xs={12}> {/*Card Buttons*/}
            <CardActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
                <IconButton
                  onClick={() =>
                    navigator.clipboard.writeText(window.location.href +"/"+slug)
                  }
                >
                  <LinkIcon />
                </IconButton>
              <FavoriteButton id={slug} />
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
