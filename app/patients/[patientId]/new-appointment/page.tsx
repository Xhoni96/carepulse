import Image from "next/image";
import Link from "next/link";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import type { SearchParamProps } from "@/lib/types";

export default async function NewAppointment({ params: { patientId } }: SearchParamProps) {
  const patient = await getPatient(patientId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[70%]">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="logo"
              className="mb-28 h-10 w-fit"
            />
          </Link>

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
      />
    </div>
  );
}
