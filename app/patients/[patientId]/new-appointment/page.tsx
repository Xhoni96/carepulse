import Image from "next/image";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { LogoHeader } from "@/components/LogoHeader";
import { getPatient } from "@/lib/db/queries";
import type { SearchParamProps } from "@/lib/types";

export default async function NewAppointment({ params: { patientId } }: SearchParamProps) {
  const patient = await getPatient(patientId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container lg:max-w-[70%]">
          <LogoHeader />

          <AppointmentForm userId={patientId} patientId={patient.$id} type="create" />

          <p className="justify-items-end text-dark-600 xl:text-left mt-10">© 2024 CarePulse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
        priority
      />
    </div>
  );
}
