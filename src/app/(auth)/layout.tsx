import ReturnHomeButton from "@/components/ui/button-return-home";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <ReturnHomeButton />
      <div className='bg-[url("https://blog.bit.ai/wp-content/uploads/2020/04/How-To-Write-A-Job-Description-Blog-Banner.png")] h-screen bg-cover bg-no-repeat bg-center flex items-center justify-center'>
        <div className="bg-white dark:bg-gray-950 p-8 rounded shadow-md opacity-90 flex flex-col items-start gap-4">
          {children}
        </div>
      </div>
    </main>
  );
}
