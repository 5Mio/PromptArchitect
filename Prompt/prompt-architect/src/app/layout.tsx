import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PromptArchitect Pro — AIJantaStack",
  description: "Gemini Vision + Claude AI prompt engineering for video and image generation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
