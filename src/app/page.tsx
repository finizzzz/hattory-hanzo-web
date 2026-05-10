"use client";
import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, ScrollControls, useScroll, Environment, Float, Center } from "@react-three/drei";
import * as THREE from "three";

// 1. IL MODELLO 3D
function KatanaModel(props: any) {
  const { scene } = useGLTF("/katana2.glb");
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // MAGIC TRICK: Correzione automatica dei materiali dal codice
  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        // Riduciamo la forza generale dei riflessi dell'ambiente
        child.material.envMapIntensity = 0.5;
        
        // Se il materiale NON è al 100% metallo (es. il manico di stoffa/legno),
        // lo rendiamo opaco e ruvido via codice.
        if (child.material.metalness < 0.8) {
            child.material.roughness = 0.9;
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!group.current) return;
    
    const offset = scroll.offset;
    
    // Animazione di scorrimento + respiro naturale
    group.current.rotation.y = (offset * Math.PI * 2) + (state.clock.elapsedTime * 0.05);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
  });

  return (
    <Center>
      <primitive ref={group} object={scene} {...props} />
    </Center>
  );
}

// 2. LA PAGINA PRINCIPALE
export default function Home() {
  return (
    <main className="relative h-screen w-full bg-[#050505] overflow-hidden">
      
      {/* SFONDO (Z-0): Ora il titolo è visibile! Abbiamo aumentato l'opacità a 10% */}
      <div className="fixed inset-0 flex items-center justify-center z-0 pointer-events-none">
        <h1 className="font-nippo text-[14vw] text-white/10 uppercase font-bold tracking-tighter">
          Hattori Hanzo
        </h1>
      </div>

      {/* MOTORE 3D (Z-10) */}
      <div className="fixed inset-0 z-10">
        {/* rimosso "color attach" così lo sfondo 3D è trasparente e fa vedere il titolo */}
        <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
          
          <ambientLight intensity={0.4} />
          {/* Luce puntata di taglio per esaltare l'acciaio */}
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
          
          <Suspense fallback={null}>
            {/* Cambiato in "studio" per avere luci meno aggressive rispetto a "city" */}
            <Environment preset="studio" />

            <ScrollControls pages={3} damping={0.25}>
              <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                {/* SCALA: Ho messo 0.15. Se è grande scendi a 0.08, se è piccola sali a 0.3 */}
                <KatanaModel scale={1.5} position={[0, 0, 0]} />
              </Float>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>

      {/* CONTENUTO HTML (Z-20): Testi in sovrimpressione */}
      <div className="relative z-20 pointer-events-none">
        
        <section className="h-screen flex items-end p-10 md:p-20">
          <div className="max-w-xl">
            <p className="font-satoshi text-gray-500 uppercase tracking-[0.4em] text-[10px] mb-4">
              Tradizione • Okinawa 1944
            </p>
            <h2 className="font-nippo text-white text-5xl md:text-7xl uppercase font-bold leading-none">
              L'Anima <br /> del Samurai
            </h2>
          </div>
        </section>

        <section className="h-screen" />

        <section className="h-screen flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-nippo text-white text-4xl uppercase tracking-tighter">
              L'acciaio non mente mai.
            </h3>
            <p className="font-satoshi text-gray-600 mt-4 text-sm tracking-widest uppercase">
              Ritorna al principio
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}