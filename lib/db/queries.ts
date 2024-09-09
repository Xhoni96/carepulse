import "server-only";

import { Query } from "node-appwrite";

import { handleActionError } from "@/lib/utils";

import { APPOINTMENT_COLLECTION_ID, database, DATABASE_ID, PATIENT_COLLECTION_ID, users } from "../appwrite.config";
import type { Appointment, Patient } from "../types/appwrite.types";

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await database.listDocuments<Appointment>(DATABASE_ID, APPOINTMENT_COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
    ]);

    const documents = appointments.documents;

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
        case "canceled":
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
  } catch (error) {
    handleActionError("An error occurred while retrieving recent appointments", error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await database.getDocument(DATABASE_ID, APPOINTMENT_COLLECTION_ID, appointmentId);

    return appointment;
  } catch (error) {
    handleActionError("An error occurred while retrieving the appointment", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    return await users.get(userId);
  } catch (error) {
    handleActionError("An error occurred while retrieving the user", error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const list = await database.listDocuments<Patient>(DATABASE_ID, PATIENT_COLLECTION_ID, [
      Query.equal("userId", [userId]),
    ]);
    return list.documents[0];
  } catch (error) {
    handleActionError("An error occurred while retrieving the existing patient", error);
  }
};
