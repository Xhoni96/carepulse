"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

export const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const encryptedKey = typeof window !== "undefined" ? window.localStorage.getItem("accessKey") : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);

    if (!path) return;

    if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY.toString()) {
      router.replace("/admin");
    } else {
      setOpen(true);
    }
  }, [encryptedKey, path, router]);

  const validatePasskey = (value: string) => {
    if (value.length === 6) {
      if (value === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        const encryptedKey = encryptKey(value);
        localStorage.setItem("accessKey", encryptedKey);
        router.push("/admin");
      } else {
        setError("Invalid passkey. Please try again.");
        setPasskey("");
      }
    }
  };

  const onOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      router.push("/");
    }
  };

  const onChange = (value: string) => {
    setPasskey(value);
    validatePasskey(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-5 bg-dark-400 border-dark-500 outline-none">
        <DialogHeader>
          <DialogTitle className="flex items-start justify-between">Admin Access Verification</DialogTitle>
          <DialogDescription>To access the admin page, please enter the passkey.</DialogDescription>
        </DialogHeader>
        <div>
          <InputOTP maxLength={6} value={passkey} onChange={onChange}>
            <InputOTPGroup className="w-full flex justify-between">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          <div
            className={`
              overflow-hidden transition-[max-height] duration-300 ease-in-out
              ${error ? "max-h-20" : "max-h-0"}
            `}
          >
            <p
              className={`
                text-red-400 text-14-regular flex justify-center
                transition-opacity duration-300 ease-in-out mt-4
                ${error ? "opacity-100" : "opacity-0"}
              `}
            >
              {error}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
