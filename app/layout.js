import { Newsreader, Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Aperture — A closer look at film",
  description:
    "An editorial home for film — reviews-worthy picks, new releases, and a reading list you keep coming back to.",

  icons: {
    icon: "https://www.pinterest.com/pin/437552920070871501/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${workSans.variable}`}
    >
      <body className="font-body bg-paper text-ink antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />

      <script src="https://cdn.zanderio.ai/widget/loader.js" data-id="wdg_xp2KKd4kG1oMvaw00Jia6z4p" defer></script>
      </body>
    </html>
  );
}
