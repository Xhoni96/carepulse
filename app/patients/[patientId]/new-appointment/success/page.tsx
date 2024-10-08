import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { LogoHeader } from "@/components/LogoHeader";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/lib/constants";
import { getAppointment } from "@/lib/db/queries";
import type { SearchParamProps } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

const RequestSuccess = async ({ searchParams, params: { patientId } }: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  if (!appointment) return null;

  const doctor = Doctors.find((doctor) => doctor.name === appointment.primaryPhysician);
  if (!doctor) return <h1>Doctor not found</h1>;

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <LogoHeader />

        <section className="flex flex-col items-center">
          <Image src="/assets/gifs/success.gif" height={300} width={280} alt="success" unoptimized priority />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image src={doctor.image} alt="doctor" width={100} height={100} className="size-6" />
            <p className="whitespace-nowrap">Dr. {doctor.name}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Calendar size={21} />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="default" className="w-[14rem]" asChild>
          <Link prefetch href={`/patients/${patientId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
