import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-300 font-sans antialiased text-white">
      <Link href="/" className="mb-28">
        <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="logo" className="h-10 w-fit" />
      </Link>
      <h1 className="text-4xl font-bold mb-4 ">404 - Page Not Found</h1>
      <p className="text-xl mb-8 ">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="px-4 py-2 bg-green-500 rounded hover:bg-green-500/90">
        Go back home
      </Link>
    </div>
  );
}
