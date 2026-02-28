"use client";

import { ThemeProvider } from "@/frontend/providers/theme-provider";
import ClientLayout from "./ClientLayout";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ClientLayout>{children}</ClientLayout>
    </ThemeProvider>
  );
}
