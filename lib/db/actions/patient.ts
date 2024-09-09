/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ID, Query } from "node-appwrite";

import { handleActionError } from "@/lib/utils";

import {
  APPWRITE_ENDPOINT,
  BUCKET_ID,
  database,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../../appwrite.config";
import type { CreateUserParams } from "../../types";
import { Patient } from "../../types/appwrite.types";
import { PatientRegisterType } from "../../validationSchemas";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name);

    return newUser;
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([Query.equal("email", [user.email])]);

      return existingUser.users[0];
    }

    handleActionError("An error occurred while creating the user", error);
  }
};

export const createPatient = async ({
  identificationDocument,
  ...patient
}: Omit<PatientRegisterType, "identificationDocument"> & {
  identificationDocument: FormData | undefined;
  userId: string;
}) => {
  try {
    let file;

    if (identificationDocument) {
      const imageFile = identificationDocument.get("blobFile") as File;

      file = await storage.createFile(BUCKET_ID, ID.unique(), imageFile);
    }

    const newPatient: Patient = await database.createDocument(DATABASE_ID, PATIENT_COLLECTION_ID, ID.unique(), {
      identificationDocumentId: file?.$id ? file.$id : null,
      identificationDocumentUrl: file?.$id
        ? `${APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
        : null,
      ...patient,
    });

    return newPatient;
  } catch (error) {
    handleActionError("An error occurred while creating the patient", error);
  }
};
