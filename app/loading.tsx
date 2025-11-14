import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="w-full h-svh content-center">
      <Spinner className="size-16 m-auto" />
    </div>
  );
}
