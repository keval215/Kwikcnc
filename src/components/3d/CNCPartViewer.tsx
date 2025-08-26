"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "motion/react";

// CNC Part Component (Cylindrical part like the uploaded image)
function CNCPart() {
  return (
    <group>
      {/* Main cylinder body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.8, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
      
      {/* Top flange */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.2, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
      
      {/* Bottom flange */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.2, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
      
      {/* Mounting holes in top flange */}
      {[0, 1, 2, 3].map((i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos((i * Math.PI) / 2) * 1.4,
            0.61,
            Math.sin((i * Math.PI) / 2) * 1.4
          ]}
        >
          <cylinderGeometry args={[0.15, 0.15, 0.25, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      ))}
      
      {/* Mounting holes in bottom flange */}
      {[0, 1, 2, 3].map((i) => (
        <mesh 
          key={i + 4} 
          position={[
            Math.cos((i * Math.PI) / 2) * 1.4,
            -0.61,
            Math.sin((i * Math.PI) / 2) * 1.4
          ]}
        >
          <cylinderGeometry args={[0.15, 0.15, 0.25, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      ))}
    </group>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-industrial-medium border-t-industrial-black rounded-full"
      />
    </div>
  );
}

export default function CNCPartViewer() {
  return (
    <div className="w-full h-[500px] bg-industrial-light rounded-lg overflow-hidden shadow-2xl border border-industrial-medium">
      {/* Interaction Instructions */}
      <div className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <p className="text-xs text-industrial-medium font-stencil-display">
          Click & drag to rotate
          <br />
          Scroll to zoom
        </p>
      </div>

      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <color attach="background" args={['#f8f9fa']} />
          
          {/* Lighting setup for industrial look */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight
            position={[-5, 5, -5]}
            intensity={0.5}
          />
          
          {/* Environment for reflections */}
          <Environment preset="studio" />
          
          {/* CNC Part */}
          <Stage adjustCamera={false} intensity={0.5} shadows="contact">
            <CNCPart />
          </Stage>
          
          {/* Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={8}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}