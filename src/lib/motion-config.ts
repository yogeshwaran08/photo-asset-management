import type { Variants } from "framer-motion";

export const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
} as const;

export const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 12,
        filter: "blur(6px)",
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            ...springTransition,
            staggerChildren: 0.1,
        } as any,
    },
    exit: {
        opacity: 0,
        y: -12,
        filter: "blur(6px)",
        transition: {
            ...springTransition,
        },
    },
};

export const listItemVariants: Variants = {
    initial: {
        opacity: 0,
        y: 12,
        filter: "blur(4px)",
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: springTransition,
    },
};

export const cardVariants: Variants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: springTransition },
    hover: {
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        transition: springTransition,
    },
};

export const dialogVariants: Variants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0, transition: springTransition },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
};

export const buttonVariants: Variants = {
    hover: { scale: 1.03 },
    tap: { scale: 0.96 },
};

export const staggerContainer: Variants = {
    animate: {
        transition: {
            staggerChildren: 0.05,
        },
    },
};
