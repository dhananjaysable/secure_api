"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 100 }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const linesGeometry = useRef<THREE.BufferGeometry>(null);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!mesh.current || !linesGeometry.current) return;

        const positions = new Float32Array(count * 3);

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            particle.mx += (state.mouse.x * 30 - particle.mx) * 0.05;
            particle.my += (state.mouse.y * 30 - particle.my) * 0.05;

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );

            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            mesh.current!.setMatrixAt(i, dummy.matrix);

            positions[i * 3] = dummy.position.x;
            positions[i * 3 + 1] = dummy.position.y;
            positions[i * 3 + 2] = dummy.position.z;
        });

        mesh.current.instanceMatrix.needsUpdate = true;

        // Create lines between close particles
        const linePositions = [];
        const connectDistance = 15;

        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < connectDistance) {
                    linePositions.push(
                        positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                        positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                    );
                }
            }
        }

        linesGeometry.current.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    });

    return (
        <>
            <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
                <dodecahedronGeometry args={[0.2, 0]} />
                <meshBasicMaterial color="#6366f1" transparent opacity={0.8} />
            </instancedMesh>
            <lineSegments>
                <bufferGeometry ref={linesGeometry} />
                <lineBasicMaterial color="#4f46e5" transparent opacity={0.15} />
            </lineSegments>
        </>
    );
}

export default function ParticleNetwork() {
    return (
        <div className="h-[500px] w-full relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 shadow-2xl">
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 text-center animate-pulse">
                    Secure API
                </h1>
                <p className="mt-4 text-gray-400 text-lg md:text-xl max-w-2xl text-center px-4">
                    Advanced Neural Security Grid
                </p>
            </div>

            <Canvas camera={{ position: [0, 0, 30], fov: 50 }}>
                <Particles count={150} />
            </Canvas>
        </div>
    );
}
