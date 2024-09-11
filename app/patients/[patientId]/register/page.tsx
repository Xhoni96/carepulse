import Image from "next/image";
import { redirect } from "next/navigation";

import { RegisterForm } from "@/components/forms/RegisterForm";
import { LogoHeader } from "@/components/LogoHeader";
import { getPatient, getUser } from "@/lib/db/queries";
import type { SearchParamProps } from "@/lib/types";

export default async function Register({ params: { patientId } }: SearchParamProps) {
  const patient = await getPatient(patientId);

  if (patient) redirect(`new-appointment`);

  const user = await getUser(patientId);

  if (!user) return null;

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[85%] pb-4">
          <LogoHeader />

          <RegisterForm
            userInfo={{
              name: user.name,
              email: user.email,
              phone: user.phone,
              $id: user.$id,
            }}
          />

          <p className="copyright py-12">© 2024 CarePulse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
}
