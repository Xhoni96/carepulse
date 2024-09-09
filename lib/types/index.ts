export type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type Gender = "Male" | "Female";
export type Status = "pending" | "scheduled" | "canceled";
export type AppointmentType = "create" | "schedule" | "cancel";

export interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
export interface User extends CreateUserParams {
  $id: string;
}

// export interface RegisterUserParams extends CreateUserParams {
//   // userId: string;
//   birthDate: string;
//   gender: Gender;
//   address: string;
//   occupation: string;
//   emergencyContactName: string;
//   emergencyContactNumber: string;
//   primaryPhysician: string;
//   insuranceProvider: string;
//   insurancePolicyNumber: string;
//   allergies: string | undefined;
//   currentMedication: string | undefined;
//   familyMedicalHistory: string | undefined;
//   pastMedicalHistory: string | undefined;
//   identificationType: string | undefined;
//   identificationNumber: string | undefined;
//   identificationDocument: File[] | undefined;
//   privacyConsent: boolean;
// }

export type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: string;
  status: Status;
  note: string | undefined;
};

export type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  timeZone?: string;
  appointment: {
    primaryPhysician: string;
    schedule: string;
    status: Status;
    cancellationReason: string | null;
  };
  type: string;
};
