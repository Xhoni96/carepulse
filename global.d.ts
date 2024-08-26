declare namespace NodeJS {
  interface ProcessEnv {
    PROJECT_ID: string;
    API_KEY: string;

    DATABASE_ID: string;
    PATIENT_COLLECTION_ID: string;
    DOCTOR_COLLECTION_ID: string;
    APPOINTMENT_COLLECTION_ID: string;

    BUCKET_ID: string;

    APPWRITE_ENDPOINT: string;
  }
}
