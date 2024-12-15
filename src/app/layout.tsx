import { Quicksand } from "next/font/google";
import "@/styles/normalize.css";

const roboto = Quicksand({
  weight: "500",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShowMeYourApp",
  description: "Created By Maksym Kondratov",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#F4F4F9 ",
          overflowX: "hidden",
          minHeight: "100vh",
        }}
        className={roboto.className}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
