"use server";

import { revalidatePath } from "next/cache";
import { ID } from "node-appwrite";

import { formatDateTime } from "@/lib/utils";
import { handleActionError } from "@/lib/utils";

import { APPOINTMENT_COLLECTION_ID, database, DATABASE_ID, messaging } from "../../appwrite.config";
import { CreateAppointmentParams, UpdateAppointmentParams } from "../../types";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newAppointment = await database.createDocument(
      DATABASE_ID,
      APPOINTMENT_COLLECTION_ID,
      ID.unique(),
      appointment,
    );

    revalidatePath("/admin");
    return newAppointment;
  } catch (error) {
    handleActionError("An error occurred while creating a new appointment", error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await database.updateDocument(
      DATABASE_ID,
      APPOINTMENT_COLLECTION_ID,
      appointmentId,
      appointment,
    );

    const smsMessage = `Greetings from CarePulse. ${
      type === "schedule"
        ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule, timeZone).dateTime} with Dr. ${
            appointment.primaryPhysician
          }`
        : `We regret to inform that your appointment for ${
            formatDateTime(appointment.schedule, timeZone).dateTime
          } is canceled. Reason:  ${appointment.cancellationReason}`
    }.`;
    await messaging.createSms(ID.unique(), smsMessage, [], [userId]);

    revalidatePath("/admin");
    return updatedAppointment;
  } catch (error) {
    handleActionError("An error occurred while updating the appointment", error);
  }
};
