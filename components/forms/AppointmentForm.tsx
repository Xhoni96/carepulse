"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions";
import { appointmentBtnLabel, appointmentStatus } from "@/lib/constants";
import type { AppointmentType, UpdateAppointmentParams } from "@/lib/types";
import type { Appointment } from "@/lib/types/appwrite.types";
import { appointmentSchema } from "@/lib/validationSchemas";

import { DoctorsDropdown } from "../DoctorsDropdown";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

export const AppointmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: AppointmentType;
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [apiError, setApiError] = useState("");

  const appointmentFormValidation = appointmentSchema[type];

  const form = useForm<z.infer<typeof appointmentFormValidation>>({
    resolver: zodResolver(appointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      schedule: appointment ? appointment.schedule : new Date().toISOString(),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof appointmentFormValidation>) => {
    const status = appointmentStatus[type];

    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: values.schedule,
          reason: values.reason ?? "",
          status: status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointment);

        if (newAppointment) {
          // form.reset();
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`);
        }
      } else {
        if (appointment) {
          const appointmentToUpdate: UpdateAppointmentParams = {
            userId,
            appointmentId: appointment.$id,
            timeZone: "", //
            appointment: {
              primaryPhysician: values.primaryPhysician,
              schedule: values.schedule,
              status: status,
              cancellationReason: values.cancellationReason ?? null,
            },
            type,
          };

          const updatedAppointment = await updateAppointment(appointmentToUpdate);

          if (updatedAppointment) {
            setOpen?.(false);
            form.reset();
          }
        }
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Something went wrong";
      setApiError(msg);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">Request a new appointment in 10 seconds.</p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            {/* PRIMARY CARE PHYSICIAN */}

            <FormField
              control={form.control}
              name="primaryPhysician"
              render={({ field }) => <DoctorsDropdown onValueChange={field.onChange} value={field.value} />}
            />

            <FormField
              control={form.control}
              name="schedule"
              render={({ field }) => (
                <FormItem className="basis-1/2 flex flex-col">
                  <FormLabel>Expected appointment date</FormLabel>
                  <FormControl>
                    <DatePicker
                      {...field}
                      //  showTimeSelect
                      //   dateFormat="MM/dd/yyyy  -  h:mm aa"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}>
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem className="basis-1/2 flex flex-col">
                    <FormLabel required>Appointment reason</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Annual montly check-up" disabled={type === "schedule"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem className="basis-1/2 flex flex-col">
                    <FormLabel>Comments/notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Prefer afternoon appointments, if possible"
                        disabled={type === "schedule"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <FormField
            control={form.control}
            name="cancellationReason"
            render={({ field }) => (
              <FormItem className="basis-1/2 flex flex-col">
                <FormLabel>Reason for cancellation</FormLabel>
                <FormControl>
                  <Textarea placeholder="Urgent meeting came up" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormMessage>{apiError}</FormMessage>
        <Button
          loading={form.formState.isSubmitting}
          type="submit"
          variant={type === "cancel" ? "destructive" : "default"}
        >
          {appointmentBtnLabel[type]}
        </Button>
      </form>
    </Form>
  );
};
