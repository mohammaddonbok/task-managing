import { Typography } from "@mui/material";
import React from "react";

export default function () {
  return (
    <footer className="w-[100%] flex bg-black grow fixed bottom-0">
      <Typography
        variant="h6"
        className="ms-[10px] my-auto text-[22px]"
        component="div"
        sx={{ flexGrow: 1 }}
      >
        Task Manager
      </Typography>
      <h3 className="me-[10px] my-auto text-[22px]">
        Created By Mohammad Aldonbuk
      </h3>
    </footer>
  );
}
