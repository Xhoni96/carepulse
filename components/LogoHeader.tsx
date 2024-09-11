import Image from "next/image";
import Link from "next/link";

export const LogoHeader = ({ alt = "logo" }: { alt?: string }) => {
  return (
    <div>
      <Link href="/">
        <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt={alt} className="mb-24 h-10 w-40" />
      </Link>
    </div>
  );
};
