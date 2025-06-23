import CVDetails from "@/components/details/cv/cv-details";
import React from "react";

export default function CVPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <CVDetails params={params} />;
}
