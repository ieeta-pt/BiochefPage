import React from 'react';

// Size variants following 4px grid
const sizeClasses = {
  xs: 'w-4 h-4',    // 16px - inline text, small badges
  sm: 'w-5 h-5',    // 20px - buttons, list items
  md: 'w-6 h-6',    // 24px - cards, medium emphasis
  lg: 'w-8 h-8',    // 32px - features, section headers
  xl: 'w-12 h-12'   // 48px - hero, large features
};

// Color variants for semantic icon coloring
const variantClasses = {
  default: '',                    // Inherits from parent
  brand: 'text-brand',            // Primary teal
  accent: 'text-accent',          // Orange
  secondary: 'text-secondary',    // Purple (AI/ML)
  tertiary: 'text-tertiary',      // Blue (infrastructure)
  muted: 'text-text-secondary',   // Gray
  success: 'text-green-600',
  warning: 'text-amber-500',
  error: 'text-red-500'
};

// Stroke widths optimized for each size
const strokeWidthBySize = {
  xs: 2,
  sm: 1.75,
  md: 1.5,
  lg: 1.5,
  xl: 1.25
};

type IconSize = keyof typeof sizeClasses;
type IconVariant = keyof typeof variantClasses;

interface IconProps {
  size?: IconSize | number;
  variant?: IconVariant;
  className?: string;
  strokeWidth?: number;
}

const getIconProps = ({ size = 'sm', variant = 'default', className = '', strokeWidth }: IconProps) => {
  const sizeClass = typeof size === 'string' ? sizeClasses[size] : '';
  const variantClass = variantClasses[variant];
  const sizeValue = typeof size === 'number' ? size : undefined;

  // Use size-optimized stroke width if not explicitly provided
  const resolvedStrokeWidth = strokeWidth ?? (typeof size === 'string' ? strokeWidthBySize[size] : 1.5);

  return {
    className: `${sizeClass} ${variantClass} ${className}`.trim(),
    width: sizeValue,
    height: sizeValue,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: resolvedStrokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const
  };
};

// ============================================
// Navigation & UI Icons
// ============================================

export const MenuIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronRightIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const ChevronLeftIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const ArrowRightIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const ArrowDownIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="M12 5v14M19 12l-7 7-7-7" />
  </svg>
);

export const ExternalLinkIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const SearchIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const FilterIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export const ExpandIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="m15 3 6 6-6 6" />
    <path d="M9 21 3 15l6-6" />
    <path d="M21 9H9" />
    <path d="M3 15h12" />
  </svg>
);

export const CollapseIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="m9 3-6 6 6 6" />
    <path d="m15 21 6-6-6-6" />
    <path d="M3 9h12" />
    <path d="M21 15H9" />
  </svg>
);

export const CopyIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const PlusIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="M5 12h14" />
  </svg>
);

// ============================================
// Feature & Concept Icons
// ============================================

export const CompassIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m9 15 6-2 2-6-6 2-2 6Z" />
  </svg>
);

export const RuntimeIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 18h6" />
    <path d="M12 16v2" />
  </svg>
);

export const ShieldCheckIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="M12 4 5 7v6c0 3.5 3 5.6 7 7 4-1.4 7-3.5 7-7V7l-7-3Z" />
    <path d="M9 12.5 11 15l4-4" />
  </svg>
);

export const BeakerIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="M6 3h12" />
    <path d="M9 3v4.5l-4 7A4 4 0 0 0 8.5 20h7a4 4 0 0 0 3.5-5.5l-4-7V3" />
    <path d="M8 9h8" />
  </svg>
);

export const DatabaseShieldIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <ellipse cx="12" cy="5" rx="7" ry="3" />
    <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
    <path d="M5 11v6c0 1.7 3.1 3 7 3 1.2 0 2.3-.1 3.4-.4" />
    <path d="M17 13.5V19l3-1.5 3 1.5v-5.5L20 12l-3 1.5Z" />
  </svg>
);

export const LightningIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="m13 2-8 12h6l-2 8 8-12h-6l2-8Z" />
  </svg>
);

export const MonitorIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8" />
    <path d="M12 16v4" />
  </svg>
);

export const CloudIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="M6 18h11a4 4 0 0 0-.5-8 5 5 0 0 0-9.5 1 3 3 0 0 0-1 7Z" />
  </svg>
);

export const LockIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const NetworkIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <circle cx="12" cy="5" r="3" />
    <circle cx="5" cy="19" r="3" />
    <circle cx="19" cy="19" r="3" />
    <path d="M12 8v4" />
    <path d="m5 16 7-4 7 4" />
  </svg>
);

export const WorkflowIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <rect x="15" y="3" width="6" height="6" rx="1" />
    <rect x="9" y="15" width="6" height="6" rx="1" />
    <path d="M6 9v3a1 1 0 0 0 1 1h3" />
    <path d="M18 9v3a1 1 0 0 1-1 1h-3" />
  </svg>
);

export const CodeIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const TerminalIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

export const DownloadIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const UploadIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export const RefreshIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

// ============================================
// Status & Feedback Icons
// ============================================

export const InfoIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

export const WarningIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

export const ErrorIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

export const SuccessIcon = (props: IconProps) => (
  <svg {...getIconProps(props)}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

// ============================================
// Social & Brand Icons (filled)
// ============================================

export const GitHubIcon = (props: IconProps) => {
  const iconProps = getIconProps(props);
  return (
    <svg {...iconProps} fill="currentColor" stroke="none">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.426 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.37-1.343-3.37-1.343-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.027 2.748-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.025 10.025 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z" clipRule="evenodd" />
    </svg>
  );
};

// ============================================
// Filled Variants (for active states)
// ============================================

export const CheckFilledIcon = (props: IconProps) => {
  const iconProps = getIconProps(props);
  return (
    <svg {...iconProps} fill="currentColor" stroke="none">
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  );
};

export const StarFilledIcon = (props: IconProps) => {
  const iconProps = getIconProps(props);
  return (
    <svg {...iconProps} fill="currentColor" stroke="none">
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  );
};

// Export size classes and variants for external use
export { sizeClasses, variantClasses, strokeWidthBySize };
export type { IconSize, IconVariant, IconProps };
