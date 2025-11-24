'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { pageMorphVariants, pageTransition } from '@/lib/jelly-animations';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                variants={pageMorphVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                style={{
                    transformOrigin: 'bottom center',
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
