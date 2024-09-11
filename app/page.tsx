import Image from "next/image";
import Link from "next/link";

import { UserForm } from "@/components/forms/UserForm";
import { LogoHeader } from "@/components/LogoHeader";
import { PasskeyModal } from "@/components/modals/PasskeyModal";
import type { SearchParamProps } from "@/lib/types";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin;

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <LogoHeader />

          <UserForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2024 CarePulse</p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
