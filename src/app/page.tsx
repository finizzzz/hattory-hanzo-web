"use client";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="relative selection:bg-hanzo-black selection:text-hanzo-yellow">
      {/* Qui, al momento, mostriamo solo la Hero Section */}
      <Hero />
      
      {/* Quando sarai pronto, inseriremo qui sotto le altre sezioni */}
      {/* <Collection /> */}
      {/* <Characters /> */}
      {/* <Philosophy /> */}
      {/* <Footer /> */}
    </main>
  );
}