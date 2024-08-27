import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-center size-full h-screen gap-3 text-white">
      <Loader className="animate-spin" size={30} />
      Loading...
    </div>
  );
}
