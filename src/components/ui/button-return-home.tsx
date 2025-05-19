"use client";

import React from "react";
import { Button } from "./button";
import Link from "next/link";
import { House } from "lucide-react";

export default function ReturnHomeButton() {
  return (
    <Link href="/" prefetch={false}>
      <Button variant="default">
       <House className="h-4 w-4" />
      </Button>
    </Link>
  );
}
