import DataTable, { TaskCompletedProps } from "@/components/DataTable";

export default function Home() {
  return (
    <div className="py-9 ">
      <div className="container">
        <DataTable isCompleted={true} />
      </div>
    </div>
  );
}
