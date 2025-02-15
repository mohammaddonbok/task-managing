"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function AddTaskButton() {
  return (
    <div>
      <Link href="/create">
        <Button variant="contained">Add Task</Button>
      </Link>
    </div>
  );
}
