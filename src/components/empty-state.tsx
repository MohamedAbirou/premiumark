"use client";

import Heading from "@/components/heading";
import { useRouter } from "next/navigation";
import Button from "./button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showRest?: boolean;
}

const EmptyState = ({
  title = "",
  subtitle = "",
  showRest,
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className="h-[50vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showRest && (
          <Button
            variant="destructive"
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
