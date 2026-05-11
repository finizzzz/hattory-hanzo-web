"use client";
import { motion } from "motion/react";

export default function Collection() {
    const swords = [
        {
          id: "01",
          owner: "La Sposa",
          name: "Ruggito del Leone",
          desc: "L'arma definitiva forgiata per la pura vendetta. Una lama che taglia persino il destino e non conosce pietà.",
          // Inserisci il percorso locale partendo con la sbarra "/"
          img: "/bride.png", 
        },
        {
          id: "02",
          owner: "Budd",
          name: "Il Dono Fraterno",
          desc: "Dimenticata in un fodero di polvere e venduta per pochi dollari. Porta incisa la dedica dell'unico fratello.",
          // Seconda immagine
          img: "/budd.jpg", 
        },
        {
          id: "03",
          owner: "Bill",
          name: "Il Demone",
          desc: "L'apice oscuro dell'arte di Hanzo. Eleganza letale e potere assoluto per l'incantatore di serpenti.",
          // Terza immagine
          img: "/bill.png", 
        }
      ];

  return (
    <section id="collection" className="bg-hanzo-black min-h-screen py-32 px-6 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto text-center mb-20 w-full">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.5em] text-hanzo-yellow block mb-6 font-bold uppercase"
        >
          L'Arsenale Leggendario
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl tracking-tighter text-white mb-4"
        >
          L'ACCIAIO DI HANZO
        </motion.h2>
        <div className="h-1 w-24 bg-hanzo-red mx-auto mt-8"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full">
        {swords.map((sword, index) => (
          <motion.div 
            key={sword.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            /* Qui avviene la magia dell'ingrandimento e del bagliore al passaggio del mouse */
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className="group cursor-pointer bg-zinc-950 border border-white/10 p-6 flex flex-col gap-6 transition-colors hover:border-hanzo-red hover:shadow-[0_0_40px_rgba(197,33,33,0.15)]"
          >
            {/* Contenitore Immagine */}
            <div className="aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/5 relative">
              <img 
                src={sword.img} 
                alt={sword.name}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 text-white/30 text-5xl font-black group-hover:text-hanzo-red transition-colors duration-500">
                {sword.id}
              </div>
            </div>
            
            {/* Contenitore Testo */}
            <div className="space-y-4">
              <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-hanzo-yellow/80">
                Proprietà: {sword.owner}
              </div>
              <h3 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tighter leading-none group-hover:text-hanzo-yellow transition-colors">
                {sword.name}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed line-clamp-3 font-medium">
                {sword.desc}
              </p>
              
              {/* Linea animata in basso */}
              <div className="pt-4">
                <div className="h-[2px] w-12 bg-white/20 transition-all duration-500 group-hover:w-full group-hover:bg-hanzo-red" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}