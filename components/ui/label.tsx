"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium text-dark-700 leading-[18px] group-aria-disabled:cursor-not-allowed group-aria-disabled:opacity-50",
  {
    variants: {
      variant: {
        destructive: "text-red-500 dark:text-red-700",
      },
    },
  },
);

const Label = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & { required?: boolean }
>(({ className, variant, required, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      labelVariants({ variant }),
      className,
      required && "after:content-['*'] after:ml-0.5 after:text-red-700",
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
