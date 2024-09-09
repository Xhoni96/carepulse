import clsx from "clsx";
import { CalendarIcon, HourglassIcon, TriangleAlertIcon } from "lucide-react";

import type { Status } from "@/lib/types";

const statusIcons = {
  scheduled: <CalendarIcon className="h-4 w-4 text-green-500" />,
  pending: <HourglassIcon className="h-4 w-4 text-blue-500" />,
  canceled: <TriangleAlertIcon className="h-4 w-4 text-red-500" />,
};

export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("flex w-fit items-center gap-2 rounded-full px-4 py-2", {
        "bg-green-600": status === "scheduled",
        "bg-blue-600": status === "pending",
        "bg-red-600": status === "canceled",
      })}
    >
      {statusIcons[status]}
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "scheduled",
          "text-blue-500": status === "pending",
          "text-red-500": status === "canceled",
        })}
      >
        {status}
      </p>
    </div>
  );
};
