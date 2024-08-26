import * as sdk from "node-appwrite";

export const {
  PROJECT_ID,
  API_KEY,
  APPWRITE_ENDPOINT,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  BUCKET_ID,
  APPOINTMENT_COLLECTION_ID,
} = process.env;

const client = new sdk.Client().setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);

export const database = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
