import AddEditTask from "@/components/AddEditTask";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AddEditTask />
      </Suspense>
    </div>
  );
}
