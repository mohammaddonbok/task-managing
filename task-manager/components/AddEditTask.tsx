"use client";
import Toaster from "@/components/Toaster";
import { Button } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface SubmitData {
  title: string;
  description?: string;
}
export default function AddEditTask() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<SubmitData>({ mode: "onChange" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [task, setTask] = useState<SubmitData | null>(null);

  const handleClick = () => {
    router.push("/");
  };

  useEffect(() => {
    if (taskId) {
      const fetchTask = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`
          );
          if (response.ok) {
            const data = await response.json();
            setTask(data);
            // Pre-populate form fields for editing
            setValue("title", data.title);
            setValue("description", data.description);
          } else {
            setToastMessage({
              message: "Failed to fetch task data",
              type: "error",
            });
          }
        } catch (error) {
          setToastMessage({ message: "Error fetching task", type: "error" });
        }
      };
      fetchTask();
    }
  }, [taskId, setValue]);

  const onSubmit: SubmitHandler<SubmitData> = async (data) => {
    setIsSubmitting(true);
    try {
      const url = taskId
        ? `${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/task/createTask`;
      const method = taskId ? "PUT" : "POST";
      const payload = taskId
        ? { title: data.title, description: data.description }
        : data;
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setToastMessage({
          message: taskId
            ? "Task updated successfully!"
            : "Task created successfully!",
          type: "success",
        });
        setTimeout(() => {
          router.push("/");
          setToastMessage(null);
        }, 2000);
      } else {
        setToastMessage({
          message: taskId ? "Failed to update task" : "Failed to create task",
          type: "error",
        });
      }
    } catch (error) {
      setToastMessage({ message: "Error submitting form", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      {toastMessage && (
        <Toaster message={toastMessage.message} type={toastMessage.type} />
      )}
      <div className=" container  text-[20px] text-black py-[10px] mt-[10%]">
        <form
          className="flex flex-col w-[50%] text-center container border-[2px] p-[20px] shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Button variant="contained" className="w-[10%]" onClick={handleClick}>
            Back
          </Button>
          <h1 className="text-[20px] my-[10px]">
            {taskId ? "Edit Task" : "Add Task"}
          </h1>
          <input
            className="my-[10px] border-[1px] p-[10px] rounded-[12px]"
            placeholder="Title"
            id="title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-start text-sm px-4">
              {errors.title.message}
            </p>
          )}

          <input
            className="my-[10px] border-[1px] p-[10px] rounded-[12px]"
            placeholder="Description"
            id="description"
            {...register("description")}
          />
          <Button
            type="submit"
            variant="contained"
            className=" py-[10px] w-[100px]"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </>
  );
}
