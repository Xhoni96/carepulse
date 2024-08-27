import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { RegisterForm } from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import type { SearchParamProps } from "@/lib/types";

export default async function Register({ params: { patientId } }: SearchParamProps) {
  const patient = await getPatient(patientId);

  if (patient) redirect(`new-appointment`);

  const user = await getUser(patientId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[70%] pb-4">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-24 h-10 w-fit"
            />
          </Link>

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
