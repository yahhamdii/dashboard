/**
 * Feature Flags for Circuit UI Migration
 * 
 * This file manages the progressive migration from MUI to Circuit UI.
 * Flags can be controlled via environment variables for easy toggling.
 */

import { usePathname } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

/**
 * Migration flags by component type
 */
export const MIGRATION_FLAGS = {
  // Component-level flags
  USE_CIRCUIT_BUTTONS: process.env.NEXT_PUBLIC_USE_CIRCUIT_BUTTONS === 'true',
  USE_CIRCUIT_FORMS: process.env.NEXT_PUBLIC_USE_CIRCUIT_FORMS === 'true',
  USE_CIRCUIT_CARDS: process.env.NEXT_PUBLIC_USE_CIRCUIT_CARDS === 'true',
  USE_CIRCUIT_TABLES: process.env.NEXT_PUBLIC_USE_CIRCUIT_TABLES === 'true',
  USE_CIRCUIT_DIALOGS: process.env.NEXT_PUBLIC_USE_CIRCUIT_DIALOGS === 'true',
  USE_CIRCUIT_LAYOUTS: process.env.NEXT_PUBLIC_USE_CIRCUIT_LAYOUTS === 'true',
  USE_CIRCUIT_TYPOGRAPHY: process.env.NEXT_PUBLIC_USE_CIRCUIT_TYPOGRAPHY === 'true',
  USE_CIRCUIT_NAVIGATION: process.env.NEXT_PUBLIC_USE_CIRCUIT_NAVIGATION === 'true',
  
  // Page/section-level flags for progressive activation
  USE_CIRCUIT_ERROR_PAGES: process.env.NEXT_PUBLIC_USE_CIRCUIT_ERROR_PAGES === 'true',
  USE_CIRCUIT_DASHBOARD: process.env.NEXT_PUBLIC_USE_CIRCUIT_DASHBOARD === 'true',
  USE_CIRCUIT_ACCOUNT: process.env.NEXT_PUBLIC_USE_CIRCUIT_ACCOUNT === 'true',
  USE_CIRCUIT_USER_MANAGEMENT: process.env.NEXT_PUBLIC_USE_CIRCUIT_USER_MANAGEMENT === 'true',
  USE_CIRCUIT_FILE_MANAGER: process.env.NEXT_PUBLIC_USE_CIRCUIT_FILE_MANAGER === 'true',
  
  // Section-specific layout flags (for progressive USE_CIRCUIT_LAYOUTS activation)
  USE_CIRCUIT_LAYOUTS_DASHBOARD: process.env.NEXT_PUBLIC_USE_CIRCUIT_LAYOUTS_DASHBOARD === 'true',
  USE_CIRCUIT_LAYOUTS_ACCOUNT: process.env.NEXT_PUBLIC_USE_CIRCUIT_LAYOUTS_ACCOUNT === 'true',
  USE_CIRCUIT_LAYOUTS_USER_MANAGEMENT: process.env.NEXT_PUBLIC_USE_CIRCUIT_LAYOUTS_USER_MANAGEMENT === 'true',
  USE_CIRCUIT_LAYOUTS_FILE_MANAGER: process.env.NEXT_PUBLIC_USE_CIRCUIT_LAYOUTS_FILE_MANAGER === 'true',
  USE_CIRCUIT_LAYOUTS_ERROR_PAGES: process.env.NEXT_PUBLIC_USE_CIRCUIT_LAYOUTS_ERROR_PAGES === 'true',
} as const;

// ----------------------------------------------------------------------

/**
 * Type for migration flag keys
 */
export type MigrationFlagKey = keyof typeof MIGRATION_FLAGS;

// ----------------------------------------------------------------------

/**
 * Hook to check if a specific migration flag is enabled
 * 
 * @param flag - The migration flag key to check
 * @returns boolean indicating if the flag is enabled
 * 
 * @example
 * ```tsx
 * const useCircuit = useCircuitComponent('USE_CIRCUIT_BUTTONS');
 * if (useCircuit) {
 *   return <CircuitButton />;
 * }
 * return <MuiButton />;
 * ```
 */
export function useCircuitComponent(flag: MigrationFlagKey): boolean {
  return MIGRATION_FLAGS[flag];
}

// ----------------------------------------------------------------------

/**
 * Section mapping for progressive layout activation
 * Maps route paths to section flags
 */
const SECTION_ROUTE_MAP: Record<string, MigrationFlagKey> = {
  [paths.dashboard.root]: 'USE_CIRCUIT_LAYOUTS_DASHBOARD',
  [paths.dashboard.user.account]: 'USE_CIRCUIT_LAYOUTS_ACCOUNT',
  [paths.dashboard.user.root]: 'USE_CIRCUIT_LAYOUTS_USER_MANAGEMENT',
  [paths.dashboard.user.list]: 'USE_CIRCUIT_LAYOUTS_USER_MANAGEMENT',
  [paths.dashboard.user.cards]: 'USE_CIRCUIT_LAYOUTS_USER_MANAGEMENT',
  [paths.dashboard.user.new]: 'USE_CIRCUIT_LAYOUTS_USER_MANAGEMENT',
  [paths.dashboard.user.profile]: 'USE_CIRCUIT_LAYOUTS_USER_MANAGEMENT',
  [paths.dashboard.fileManager]: 'USE_CIRCUIT_LAYOUTS_FILE_MANAGER',
  [paths.page404]: 'USE_CIRCUIT_LAYOUTS_ERROR_PAGES',
  [paths.page403]: 'USE_CIRCUIT_LAYOUTS_ERROR_PAGES',
  [paths.page500]: 'USE_CIRCUIT_LAYOUTS_ERROR_PAGES',
} as const;

/**
 * Helper function to get section flag from pathname
 * 
 * @param pathname - Current route pathname
 * @returns Section flag key or null if no match
 */
function getSectionFlagFromPath(pathname: string): MigrationFlagKey | null {
  // Exact match first
  if (SECTION_ROUTE_MAP[pathname]) {
    return SECTION_ROUTE_MAP[pathname];
  }
  
  // Check for path prefixes (for nested routes)
  for (const [path, flag] of Object.entries(SECTION_ROUTE_MAP)) {
    if (pathname.startsWith(path)) {
      return flag as MigrationFlagKey;
    }
  }
  
  return null;
}

/**
 * Hook to check if USE_CIRCUIT_LAYOUTS is enabled for the current section
 * 
 * This hook combines the global USE_CIRCUIT_LAYOUTS flag with section-specific flags
 * for progressive activation by section.
 * 
 * @returns boolean indicating if Circuit UI layouts should be used
 * 
 * @example
 * ```tsx
 * const useCircuit = useCircuitLayouts();
 * if (useCircuit) {
 *   return <div className="flex gap-2">...</div>;
 * }
 * return <Box sx={{ display: 'flex', gap: 2 }}>...</Box>;
 * ```
 */
export function useCircuitLayouts(): boolean {
  // If global flag is enabled, use it everywhere
  if (MIGRATION_FLAGS.USE_CIRCUIT_LAYOUTS) {
    return true;
  }
  
  // Otherwise, check section-specific flags
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const sectionFlag = getSectionFlagFromPath(pathname);
    
    if (sectionFlag && MIGRATION_FLAGS[sectionFlag]) {
      return true;
    }
  }
  
  return false;
}

/**
 * Hook version that uses Next.js usePathname (for client components)
 * 
 * IMPORTANT: This hook must be used in client components only ('use client')
 * 
 * @returns boolean indicating if Circuit UI layouts should be used
 * 
 * @example
 * ```tsx
 * 'use client';
 * 
 * import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';
 * 
 * export function MyComponent() {
 *   const useCircuit = useCircuitLayoutsWithPathname();
 *   // ...
 * }
 * ```
 */
export function useCircuitLayoutsWithPathname(): boolean {
  // If global flag is enabled, use it everywhere
  if (MIGRATION_FLAGS.USE_CIRCUIT_LAYOUTS) {
    return true;
  }
  
  // Otherwise, check section-specific flags using Next.js usePathname
  const pathname = usePathname();
  const sectionFlag = getSectionFlagFromPath(pathname);
  
  if (sectionFlag && MIGRATION_FLAGS[sectionFlag]) {
    return true;
  }
  
  return false;
}

// ----------------------------------------------------------------------

/**
 * Get all enabled migration flags
 * Useful for debugging or logging
 */
export function getEnabledFlags(): MigrationFlagKey[] {
  return Object.entries(MIGRATION_FLAGS)
    .filter(([, enabled]) => enabled)
    .map(([key]) => key as MigrationFlagKey);
}

// ----------------------------------------------------------------------

/**
 * Check if any migration flags are enabled
 * Useful to conditionally load Circuit UI providers
 */
export function hasAnyCircuitEnabled(): boolean {
  return Object.values(MIGRATION_FLAGS).some(Boolean);
}

// ----------------------------------------------------------------------

/**
 * Get migration progress percentage
 * Based on enabled flags vs total flags
 */
export function getMigrationProgress(): number {
  const total = Object.keys(MIGRATION_FLAGS).length;
  const enabled = getEnabledFlags().length;
  return Math.round((enabled / total) * 100);
}

