import clsx from "clsx";

type StatCardProps = {
  type: "appointments" | "pending" | "canceled";
  count: number;
  label: string;
  icon: JSX.Element;
};

export const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={clsx("flex flex-1 flex-col gap-6 rounded-2xl bg-cover p-6 shadow-lg", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-canceled": type === "canceled",
      })}
    >
      <div className="flex items-center gap-4">
        {icon}
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>

      <p className="text-14-regular">{label}</p>
    </div>
  );
};
