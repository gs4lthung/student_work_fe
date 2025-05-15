"use client";

import React from "react";
import { MultiStepLoader } from "./multi-step-loader";
import { Button } from "./button";
import { SquareX, SquareXIcon, X } from "lucide-react";

const loadingStates = [
  {
    text: "Buying a condo",
  },
  {
    text: "Travelling in a flight",
  },
  {
    text: "Meeting Tyler Durden",
  },
  {
    text: "He makes soap",
  },
  {
    text: "We goto a bar",
  },
  {
    text: "Start a fight",
  },
  {
    text: "We like it",
  },
  {
    text: "Welcome to F**** C***",
  },
];
export default function HowToUseLoader() {
  const [loading, setLoading] = React.useState(false);
  return (
    <>
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
        duration={2000}
      />
      <Button variant="outline" onClick={() => setLoading((prev) => !prev)}>
        Hướng dẫn sử dụng
      </Button>

            {loading && (
        <Button
          className="fixed top-4 right-4 z-[120]"
          onClick={() => setLoading(false)}
        >
          <X className="h-10 w-10" />
        </Button>
      )}
    </>
  );
}
