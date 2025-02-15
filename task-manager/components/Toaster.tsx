import React, { useEffect, useState } from "react";

interface ToasterProps {
  message: string;
  type: "success" | "error";
}

const Toaster: React.FC<ToasterProps> = ({ message, type }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-[100px] right-5 p-4 rounded-md shadow-lg transition-all duration-300 ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Toaster;
