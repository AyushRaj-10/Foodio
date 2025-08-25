import React from 'react';
import { motion } from 'framer-motion';

/**
 * Premium Glass Morphism Card Component
 * Features: Backdrop blur, gradient overlays, hover animations, accessibility
 */
const GlassCard = ({ 
  children, 
  className = '', 
  onClick, 
  hover = true,
  variant = 'default', // 'default', 'elevated', 'subtle'
  animation = true,
  disabled = false,
  ariaLabel,
  ...props 
}) => {
  // Variant styles
  const variants = {
    default: 'backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl shadow-black/5',
    elevated: 'backdrop-blur-3xl bg-white/15 border border-white/30 shadow-3xl shadow-black/10',
    subtle: 'backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl shadow-black/2'
  };

  // Animation variants for Framer Motion
  const motionVariants = {
    initial: { scale: 1, rotateY: 0 },
    hover: { 
      scale: hover ? 1.02 : 1, 
      rotateY: hover ? 2 : 0,
      transition: { 
        duration: 0.4, 
        ease: [0.4, 0.0, 0.2, 1] // Custom easing
      }
    },
    tap: { 
      scale: onClick ? 0.98 : 1,
      transition: { duration: 0.1 }
    }
  };

  const Component = animation ? motion.div : 'div';
  const motionProps = animation ? {
    variants: motionVariants,
    initial: "initial",
    whileHover: "hover",
    whileTap: onClick ? "tap" : undefined,
  } : {};

  return (
    <Component
      onClick={disabled ? undefined : onClick}
      className={`
        relative rounded-3xl transition-all duration-500 transform-gpu
        ${variants[variant]}
        ${hover && !disabled ? 'hover:bg-white/15 cursor-pointer' : ''}
        ${onClick && !disabled ? 'active:scale-[0.98]' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      aria-label={ariaLabel}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && !disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(e);
        }
      }}
      {...motionProps}
      {...props}
    >
      {/* Primary gradient overlay */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none" />
      
      {/* Secondary shimmer effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Optional glow effect for elevated variant */}
      {variant === 'elevated' && (
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
      )}
    </Component>
  );
};

// Pre-configured variants for common use cases
export const ElevatedGlassCard = (props) => (
  <GlassCard variant="elevated" {...props} />
);

export const SubtleGlassCard = (props) => (
  <GlassCard variant="subtle" hover={false} {...props} />
);

export const InteractiveGlassCard = (props) => (
  <GlassCard hover={true} animation={true} {...props} />
);

export default GlassCard;