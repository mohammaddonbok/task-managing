"use client";

import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddTaskButton from "./AddTaskButton";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import Toaster from "./Toaster";

export interface TaskCompletedProps {
  isCompleted: boolean;
}

type TaskData = {
  _id: string;
  counter: string;
  title: string;
  description: string;
  completed: boolean;
};

type TableData = {
  data: TaskData[];
  pagination: Pagination;
};
type Pagination = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

const DataTable: React.FC<TaskCompletedProps> = () => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const [taskList, setTaskList] = useState<TaskData[]>([]);
  const [pagable, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const mainDomain = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const url = isCompleted
      ? `${mainDomain}/tasks/completed?page=${pagable.page}&limit=${pagable.limit}`
      : `${mainDomain}/tasks?page=${pagable.page}&limit=${pagable.limit}`;
    const fetchTasks = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: TableData = await response.json(); // Parse the response as JSON
        setIsChecked(false);
        setTaskList(data.data);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks(); // Call the async function
  }, [pagable.page, pagable.limit, isCompleted, isSubmitting, isChecked]);

  const handleClick = () => {
    setIsCompleted((prev) => !prev);
  };

  const handleUpdate = async (task: TaskData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/task/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            completed: true,
          }),
        }
      );

      if (response.ok) {
        setToastMessage({
          message: "Task Set as Completed ",
          type: "success",
        });
        setTimeout(() => {
          setIsChecked(false);
          setToastMessage(null);
        }, 1000);
      } else {
        setToastMessage({ message: "Failed Completing task", type: "error" });
      }
    } catch (error) {
      setToastMessage({ message: "Error completing task", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handelDeletion = async (data: string) => {
    if (!router) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/task/${data}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setToastMessage({
          message: "Task deleted successfully!",
          type: "success",
        });
        setTimeout(() => {
          setToastMessage(null);
        }, 2000);
      } else {
        setToastMessage({ message: "Failed to delete task", type: "error" });
      }
    } catch (error) {
      setToastMessage({ message: "Error delete record", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination({
      total: pagable.total,
      page: newPage,
      limit: pagable.limit,
      totalPages: pagable.totalPages,
    });
  };

  //This Function when check
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    task: TaskData
  ) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if (checked) {
      handleUpdate(task);
    }
  };
  return (
    <>
      {toastMessage && (
        <Toaster message={toastMessage.message} type={toastMessage.type} />
      )}
      <div className="w-full flex-col ">
        <div className="w-[100%] flex justify-between mb-[10px] ">
          {isCompleted ? (
            <Button
              variant="contained"
              style={{
                backgroundColor: "red",
                color: "white",
              }}
              onClick={handleClick}
            >
              Show In Completed Task
            </Button>
          ) : (
            <Button variant="contained" onClick={handleClick}>
              Show Completed Task
            </Button>
          )}

          <div>{!isCompleted && <AddTaskButton />}</div>
        </div>
        <div className="flex w-full justify-around text-center text-[20px] text-black py-[10px] border-[2px] border-b-0 divide-x bg-gray-100">
          {!isCompleted && <div className="w-[100px] pe-[100px]"></div>}
          <div className="w-[130px]">#</div>
          <div className="w-[200px]">Task title</div>
          <div className="w-[130px]">Status</div>
          <div className="w-[100%] bg-gray">Task Description</div>
          <div className="w-[250px]">Actions</div>
        </div>
        {taskList &&
          taskList.map((task, index) => (
            <div
              key={index}
              className="w-full flex justify-around text-center text-[18px] text-black py-[10px] border-[1px] divide-x"
            >
              {!isCompleted && (
                <div className="my-auto">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="w-[100px]"
                    onChange={(e) => handleCheckboxChange(e, task)}
                  />
                </div>
              )}
              <div className="w-[130px] my-auto">{index + 1}</div>
              <div className="w-[200px] my-auto"> {task.title}</div>

              {!task.completed ? (
                <div className="w-[130px] my-auto">To Do </div>
              ) : (
                <div className="w-[130px] my-auto text-green-500">Done</div>
              )}

              <div className="w-[100%] my-auto bg-gray text-start ps-2">
                {task.description}
              </div>
              <div className="w-[250px] flex justify-around">
                <IconButton onClick={() => handelDeletion(task._id)}>
                  <DeleteIcon style={{ color: "red" }} />
                </IconButton>
                {!task.completed && (
                  <Link href={`/create?taskId=${task._id}`} className="mt-1">
                    <EditIcon style={{ color: "blue" }} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        <div className="flex justify-center  items-center text-[20px] text-black py-[10px]">
          <button
            onClick={() => handlePageChange(pagable.page - 1)}
            disabled={pagable.page === 1}
            className="px-4 py-2 bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-100">
            Page {pagable.page} of {pagable.totalPages} (Total: {pagable.total})
          </span>
          <button
            onClick={() => handlePageChange(pagable.page + 1)}
            disabled={pagable.page === pagable.totalPages}
            className="px-4 py-2 bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
export default DataTable;
