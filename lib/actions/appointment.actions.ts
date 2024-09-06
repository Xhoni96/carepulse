"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";

import { APPOINTMENT_COLLECTION_ID, database, DATABASE_ID, messaging } from "../appwrite.config";
import { CreateAppointmentParams, UpdateAppointmentParams } from "../types";
import { Appointment } from "../types/appwrite.types";
import { formatDateTime } from "../utils";

//  CREATE APPOINTMENT
export const createAppointment = async (appointment: CreateAppointmentParams) => {
  // try {
  const newAppointment = await database.createDocument(
    DATABASE_ID!,
    APPOINTMENT_COLLECTION_ID!,
    ID.unique(),
    appointment,
  );

  revalidatePath("/admin");
  return newAppointment;
  // } catch (error) {
  //   console.error("An error occurred while creating a new appointment:", error);
  // }
};

//  GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  // try {
  const appointments = await database.listDocuments(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, [
    Query.orderDesc("$createdAt"),
  ]);

  const documents = appointments.documents as Appointment[];

  const initialCounts = {
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,
  };

  documents.forEach((appointment) => {
    switch (appointment.status) {
      case "scheduled":
        initialCounts.scheduledCount++;
        break;
      case "pending":
        initialCounts.pendingCount++;
        break;
      case "cancelled":
        initialCounts.cancelledCount++;
        break;
    }
  });

  const data = {
    totalCount: appointments.total,
    ...initialCounts,
    documents: documents,
  };

  return data;
  // } catch (error) {
  //   console.error("An error occurred while retrieving the recent appointments:", error);
  // }
};

//  SEND SMS NOTIFICATION
export const sendSMSNotification = async (userId: string, content: string) => {
  // try {
  // https://appwrite.io/docs/references/1.5.x/server-nodejs/messaging#createSms
  const message = await messaging.createSms(ID.unique(), content, [], [userId]);
  return message;
  // } catch (error) {
  //   console.error("An error occurred while sending sms:", error);
  // }
};

//  UPDATE APPOINTMENT
export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  // try {
  // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/database#updateDocument
  const updatedAppointment = await database.updateDocument(
    DATABASE_ID!,
    APPOINTMENT_COLLECTION_ID!,
    appointmentId,
    appointment,
  );

  if (!updatedAppointment) throw Error;

  const smsMessage = `Greetings from CarePulse. ${
    type === "schedule"
      ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule, timeZone).dateTime} with Dr. ${
          appointment.primaryPhysician
        }`
      : `We regret to inform that your appointment for ${
          formatDateTime(appointment.schedule!, timeZone).dateTime
        } is cancelled. Reason:  ${appointment.cancellationReason}`
  }.`;
  await sendSMSNotification(userId, smsMessage);

  revalidatePath("/admin");
  return updatedAppointment;
  // } catch (error) {
  //   console.error("An error occurred while scheduling an appointment:", error);
  // }
};

// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  // try {
  const appointment = await database.getDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, appointmentId);

  return appointment;
  // } catch (error) {
  //   console.error("An error occurred while retrieving the existing patient:", error);
  // }
};
