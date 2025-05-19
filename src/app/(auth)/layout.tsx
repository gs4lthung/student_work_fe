import ReturnHomeButton from "@/components/ui/button-return-home"
import Image from "next/image"
import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://blog.bit.ai/wp-content/uploads/2020/04/How-To-Write-A-Job-Description-Blog-Banner.png"
          alt="Background image"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={100}
        />
      </div>

      <div className="relative z-10 top-4 left-4">
        <ReturnHomeButton />
      </div>

      <div className="relative z-10 h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-gray-950 p-8 rounded shadow-md opacity-90 flex flex-col items-start gap-4">
          {children}
        </div>
      </div>
    </main>
  )
}
