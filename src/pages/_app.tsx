import type { AppProps } from "next/app";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NavBar from "src/components/NavBar";
import { useState } from "react";

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export const defaultCoordindates = {
  latitude: 42.340075,
  longitude: -71.088257,
};
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}
