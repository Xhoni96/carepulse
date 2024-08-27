import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().min(1, "Name is a required field"),
  email: z.string().email("Email is a required field"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (phone) => /^\+\d{1,4}\d{6,11}$/.test(phone.replace(/[\s()-]/g, "")),
      "Phone number must start with a valid country code and contain only digits without any spaces or symbols."
    ),
});

export const patientRegisterFormSchema = userFormSchema.extend({
  birthDate: z.string(),
  gender: z.enum(["Male", "Female"], { message: "Please select a gender" }),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(500, "Occupation must be at most 500 characters"),
  emergencyContactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name must be at most 50 characters"),
  emergencyContactNumber: z
    .string()
    .refine((emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber), "Invalid phone number"),
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  insuranceProvider: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Policy number must be at least 2 characters")
    .max(50, "Policy number must be at most 50 characters"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z.boolean(),
  disclosureConsent: z.boolean(),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});

export type PatientRegisterType = z.infer<typeof patientRegisterFormSchema>;

export const createAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.string(),
  reason: z.string().min(2, "Reason must be at least 2 characters").max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

const scheduleAppointmentSchema = createAppointmentSchema.extend({
  reason: z.string().optional(),
});

const cancelAppointmentSchema = scheduleAppointmentSchema.extend({
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export const appointmentSchema = {
  create: createAppointmentSchema,
  cancel: cancelAppointmentSchema,
  schedule: scheduleAppointmentSchema,
};
