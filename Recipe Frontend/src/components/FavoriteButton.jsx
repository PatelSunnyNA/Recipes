import React, { useState } from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material";

const FavoriteButton = ({ id }) => {
  const theme = useTheme();
  const [storageItem, setStorageItem] = useState(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  const isFavourited = storageItem.includes(id);

  const handleToggleFavourite = () => {
    if (!isFavourited) {
      const newStorageItem = [...storageItem, id];
      setStorageItem(newStorageItem);
      localStorage.setItem("favorites", JSON.stringify(newStorageItem));
    } else {
      const newStorageItem = storageItem.filter((savedId) => savedId !== id);
      setStorageItem(newStorageItem);
      localStorage.setItem("favorites", JSON.stringify(newStorageItem));
    }
  };

  return (
    <IconButton onClick={handleToggleFavourite}>
      {isFavourited ? (
        <Favorite color="error" />
      ) : (
        <FavoriteBorder color="error" />
      )}
    </IconButton>
  );
};
export default FavoriteButton;
