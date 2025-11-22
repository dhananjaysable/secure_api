"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

function SecureMesh() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[2, 0]} />
                <meshStandardMaterial
                    color="#4f46e5"
                    emissive="#312e81"
                    emissiveIntensity={0.5}
                    roughness={0.1}
                    metalness={0.8}
                    wireframe
                />
            </mesh>
            <mesh scale={[1.8, 1.8, 1.8]}>
                <icosahedronGeometry args={[2, 0]} />
                <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.3} />
            </mesh>
        </Float>
    );
}

export default function Hero3D() {
    return (
        <div className="h-[500px] w-full relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 shadow-2xl">
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 text-center"
                >
                    Secure API
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-4 text-gray-400 text-lg md:text-xl max-w-2xl text-center px-4"
                >
                    Next-generation security for your digital infrastructure.
                </motion.p>
            </div>

            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, -10, -10]} angle={0.3} penumbra={1} intensity={1} color="#4f46e5" />
                <SecureMesh />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
}
