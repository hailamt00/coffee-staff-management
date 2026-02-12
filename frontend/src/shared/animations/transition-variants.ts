import { Variants } from 'framer-motion'

/**
 * Smoother page transition variants with premium easing
 */
export const pageTransition: Variants = {
    initial: {
        opacity: 0,
        y: 12,
        scale: 0.98
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier
        }
    },
    exit: {
        opacity: 0,
        y: -12,
        scale: 0.98,
        transition: {
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

/**
 * Stagger container for animating children in sequence
 */
export const staggerContainer: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    }
}

/**
 * Individual item animation within stagger container
 */
export const staggerItem: Variants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.95
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.95,
        transition: {
            duration: 0.3
        }
    }
}

/**
 * Fade in animation for modals and overlays
 */
export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: 'easeOut'
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: 'easeIn'
        }
    }
}

/**
 * Scale with fade for cards and elements
 */
export const scaleIn: Variants = {
    initial: {
        opacity: 0,
        scale: 0.9
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: {
            duration: 0.2
        }
    }
}

/**
 * Slide up animation
 */
export const slideUp: Variants = {
    initial: {
        y: '100%',
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    exit: {
        y: '100%',
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}
