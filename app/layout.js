"use client";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AppLayaout from "./components/AppLayout";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";

export default function RootLayout({ children }) {
  const useQueryClient = new useQueryClient();

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={useQueryClient}>
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
