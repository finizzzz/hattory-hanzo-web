// 1. Importiamo i pezzi necessari
import KatanaModel from './components/KatanaModel';

export default function Home() {
  return (
    // Il contenitore principale che occupa tutto lo schermo
    <main className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      
      {/* LAYER 1: Il contenitore per la Katana 3D */}
      {/* Usiamo 'absolute inset-0' per farlo grande quanto tutto lo schermo e metterlo sullo sfondo */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <KatanaModel />
      </div>

      {/* LAYER 2: L'interfaccia testuale (fluttua sopra la spada) */}
      {/* 'pointer-events-none' serve per cliccare la spada anche se il testo ci sta davanti */}
      <div className="relative z-20 text-center pointer-events-none">
        <h1 className="font-nippo text-[12vw] leading-none font-bold tracking-tighter text-white mix-blend-difference">
          HATTORI HANZO
        </h1>
        <p className="font-satoshi mt-2 text-sm md:text-base uppercase tracking-[0.4em] text-gray-500">
          Leggendaria Forgiatura • Okinawa
        </p>
      </div>

      {/* Coordinate estetiche in basso */}
      <div className="absolute bottom-10 left-10 z-20 font-satoshi text-[10px] text-gray-600 uppercase tracking-widest">
        26° 12' 44" N / 127° 40' 45" E
      </div>
      
    </main>
  );
}