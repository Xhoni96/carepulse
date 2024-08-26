"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatePickerType = {
  onChange: (val: string) => void;
  value: string | undefined;
};
export const DatePicker = ({ onChange, value }: DatePickerType) => {
  const [open, setOpen] = useState(false);

  const onSelect = (val: Date | undefined) => {
    if (val) {
      setOpen(false);

      onChange(val.toISOString());
    }
  };

  const onOpenChange = () => {
    setOpen(!open);
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-11 justify-start text-left font-normal bg-dark-400 border-dark-500 text-dark-700",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-dark-700" />
          {value ? format(value, "PPP") : <span className="text-dark-600">Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-dark-400 border-dark-500" align="start">
        <Calendar mode="single" selected={new Date(value ?? "")} onSelect={onSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
};
