"use client";
import { motion } from "motion/react";
import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Center, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import * as THREE from "three";

// IMPORTANTE: Abbiamo importato la sezione Collection!
import Collection from "./Collection";

// --- IL MODELLO DELLA KATANA CON USCITA LATERALE ---
function KatanaModel(props: any) {
  const { scene } = useGLTF("/katana2.glb");
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material.envMapIntensity = 0.8;
        if (child.material.name.toLowerCase().includes("metal") || child.material.metalness > 0.5) {
          child.material.metalness = 1.0;
          child.material.roughness = 0.05;
        } else {
          child.material.roughness = 0.9;
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!group.current) return;
    const offset = scroll.offset;
    group.current.position.x = -(offset * 20);
    group.current.rotation.y = (state.clock.elapsedTime * 0.4) + (offset * Math.PI * 4);
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} {...props} />
      </Center>
    </group>
  );
}

// --- LA HERO SECTION COMPLETA ---
export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full bg-hanzo-yellow overflow-hidden">
      
      {/* Sfondo Decorativo */}
      <div className="absolute right-0 h-full w-[35%] flex items-center justify-center opacity-40 pointer-events-none z-0">
        <div className="text-[18rem] font-black rotate-90 whitespace-nowrap text-black/10">服部半蔵</div>
      </div>

      {/* --- MOTORE 3D E DI SCROLL --- */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 15, 10]} angle={0.3} intensity={3} color="#ffffff" />
          <pointLight position={[-5, -5, -5]} intensity={4} color="#C52121" />

          <Suspense fallback={null}>
            <Environment preset="studio" />
            
            {/* pages={3} perché ora il sito è diventato più lungo con le 3 spade! */}
            <ScrollControls pages={3} damping={0.2}>
              
              {/* LIVELLO 1: Oggetti 3D */}
              <Scroll>
                <KatanaModel scale={1.8} rotation={[0.2, 0, 0.5]} />
              </Scroll>

              {/* LIVELLO 2: L'HTML che scorre SOPRA la spada */}
              <Scroll html style={{ width: "100%" }}>
                
                {/* --- PRIMA SCHERMATA: I TESTI DELLA HERO --- */}
                <div className="h-screen w-full flex flex-col items-center justify-center px-6 md:px-12 relative z-20 pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "circOut" }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="h-[1px] w-12 bg-black"></div>
                      <span className="text-xs uppercase tracking-[0.4em] font-bold text-black">Perfezione Giapponese</span>
                      <div className="h-[1px] w-12 bg-black"></div>
                    </div>
                    
                    <h1 className="text-7xl md:text-[140px] leading-[0.85] tracking-[0.1em] mb-10 text-stroke-black opacity-80">
                      Hattori<br />Hanzo
                    </h1>
                    
                    <p className="text-lg md:text-xl font-medium max-w-2xl px-8 py-4 my-4 text-hanzo-black leading-snug bg-hanzo-yellow/30 backdrop-blur-sm border-y-2 border-black">
                      "L'acciaio non mente mai. Le migliori spade del mondo non sono più fatte da secoli, ma io ho infranto il mio giuramento per la tua vendetta."
                    </p>

                    <div className="flex gap-4 mt-8 pointer-events-auto">
                      <button className="bg-black text-white px-12 py-5 text-xs tracking-[0.2em] uppercase hover:bg-hanzo-red hover:text-white hover:border-hanzo-red border-2 border-black transition-all cursor-pointer">
                        La Collezione
                      </button>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                  >
                    <span className="text-[10px] font-bold tracking-[0.3em] text-hanzo-black uppercase">Scrolla giù</span>
                    <div className="h-16 w-[1px] bg-black/20 relative overflow-hidden">
                      <motion.div animate={{ y: [-64, 64] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute top-0 w-full h-1/2 bg-black" />
                    </div>
                  </motion.div>
                </div>

                {/* --- SECONDA SCHERMATA: LA GALLERIA DELLE SPADE --- */}
                {/* Invece del blocco nero di prima, ora c'è la Collection! */}
                <div className="w-full relative z-20 pointer-events-auto">
                   <Collection />
                </div>

              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}