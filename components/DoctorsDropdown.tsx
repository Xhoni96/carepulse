"use client";

import Image from "next/image";

import { Doctors } from "@/lib/constants";

import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Props = {
  value: string;
  onValueChange: (value: string) => void;
};
export const DoctorsDropdown = ({ value, onValueChange }: Props) => {
  return (
    <FormItem className="grow">
      <FormLabel>Primary care physician</FormLabel>

      <Select onValueChange={onValueChange} value={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a physician" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {Doctors.map((doctor, i) => (
            <SelectItem key={doctor.name + i} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt="doctor"
                  className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <FormMessage />
    </FormItem>
  );
};
