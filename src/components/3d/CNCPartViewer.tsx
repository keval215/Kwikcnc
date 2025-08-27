"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

// Mechanical Part Component - Improved CNC part representation
const MechanicalPart = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main cylindrical body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 2, 32]} />
        <meshStandardMaterial color="#E0E0E0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Top flange */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.3, 32]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Bottom flange */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.3, 32]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Center bore */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 2.1, 16]} />
        <meshStandardMaterial color="#404040" metalness={0.5} roughness={0.8} />
      </mesh>

      {/* Mounting holes */}
      {[0, 60, 120, 180, 240, 300].map((angle, index) => {
        const x = Math.cos((angle * Math.PI) / 180) * 1.4;
        const z = Math.sin((angle * Math.PI) / 180) * 1.4;
        return (
          <mesh key={index} position={[x, 1.2, z]}>
            <cylinderGeometry args={[0.1, 0.1, 0.4, 8]} />
            <meshStandardMaterial color="#202020" metalness={0.3} roughness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="w-8 h-8 border-2 border-industrial-grey border-t-industrial-black rounded-full"
    />
  </div>
);

const CADModelViewer = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="cad-viewer-frame h-[600px] w-full relative overflow-hidden ml-auto"
      style={{
        minHeight: '600px',
        maxHeight: '600px',
        minWidth: '100%',
        maxWidth: '100%',
        marginRight: '0'
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-industrial-light-grey flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      <Canvas
        onCreated={() => setIsLoading(false)}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
        resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
      >
        <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />

        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <pointLight position={[0, 0, 10]} intensity={0.5} />

        <Suspense fallback={null}>
          <MechanicalPart />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={12}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>


    </motion.div>
  );
};

export default CADModelViewer;