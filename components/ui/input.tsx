import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, icon, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      {icon && <div className="absolute left-3 flex items-center pointer-events-none">{icon}</div>}

      <input
        type={type}
        className={cn(
          "default-input flex w-full px-3 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          icon ? "pl-10" : "",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

export { Input };
