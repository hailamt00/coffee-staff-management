import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
    pageTransition,
    staggerContainer,
    staggerItem
} from './transition-variants'

/**
 * Wrapper component with page transition
 */
interface PageWrapperProps {
    children: ReactNode
    className?: string
}

export function PageWrapper({ children, className = '' }: PageWrapperProps) {
    return (
        <motion.div
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className={className}
        >
            {children}
        </motion.div>
    )
}

/**
 * Stagger container component
 */
export function StaggerContainer({ children, className = '' }: PageWrapperProps) {
    return (
        <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            exit="exit"
            className={className}
        >
            {children}
        </motion.div>
    )
}

/**
 * Stagger item component
 */
export function StaggerItem({ children, className = '' }: PageWrapperProps) {
    return (
        <motion.div
            variants={staggerItem}
            className={className}
        >
            {children}
        </motion.div>
    )
}
