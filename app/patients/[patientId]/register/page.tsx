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
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[70%]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-28 h-10 w-fit"
          />

          <RegisterForm
            userInfo={{
              name: user.name,
              email: user.email,
              phone: user.phone,
              $id: user.$id,
            }}
          />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2024 CarePulse</p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
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
