"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { MoveUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Button
      className={`bg-green-400 hover:bg-green-500 fixed bottom-4 right-4 transition-opacity duration-300 ease-in-out ${
        showScroll ? "opacity-100" : "opacity-0"
      }`}
      onClick={() => {
        scrollToTop();
      }}
    >
      <MoveUp className="h-4 w-4" />
    </Button>
  );
}
