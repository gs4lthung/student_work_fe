import { cn } from "@/lib/utils";

interface TypographyH1Props {
  children: React.ReactNode;
  className?: string;
}

export function TypographyH1({ children, className }: TypographyH1Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

interface TypographyH2Props {
  children: React.ReactNode;
  className?: string;
}

export function TypographyH2({ children, className }: TypographyH2Props) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

interface TypographyH3Props {
  children: React.ReactNode;
  className?: string;
}

export function TypographyH3({ children, className }: TypographyH3Props) {
  return (
    <h3 className={cn("text-3xl font-bold mb-4 text-gray-600", className)}>
      {children}
    </h3>
  );
}
