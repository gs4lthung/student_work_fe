"use client";

import React from "react";
import Link from "next/link";
import { House } from "lucide-react";

export default function ReturnHomeButton() {
  return (
    <Link
      href="/"
      prefetch={false}
      className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-primary px-3 py-2 text-sm font-medium text-white dark:text-black shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
    >
      <House />
    </Link>
  );
}
