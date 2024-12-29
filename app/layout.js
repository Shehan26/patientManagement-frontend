"use client";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AppLayaout from "./components/AppLayout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AntdRegistry>
            <AppLayaout>
              {children}
            </AppLayaout>
          </AntdRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}
