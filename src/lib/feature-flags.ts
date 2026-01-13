/**
 * Feature Flags for Circuit UI Migration
 * 
 * This file manages the progressive migration from MUI to Circuit UI.
 * Flags can be controlled via environment variables for easy toggling.
 */

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
  USE_CIRCUIT_LAYOUTS: process.env.NEXT_PUBLIC_USE_CIRCUIT_LAYOUTS === 'true',
  USE_CIRCUIT_TYPOGRAPHY: process.env.NEXT_PUBLIC_USE_CIRCUIT_TYPOGRAPHY === 'true',
  USE_CIRCUIT_NAVIGATION: process.env.NEXT_PUBLIC_USE_CIRCUIT_NAVIGATION === 'true',
  
  // Page/section-level flags
  USE_CIRCUIT_ERROR_PAGES: process.env.NEXT_PUBLIC_USE_CIRCUIT_ERROR_PAGES === 'true',
  USE_CIRCUIT_DASHBOARD: process.env.NEXT_PUBLIC_USE_CIRCUIT_DASHBOARD === 'true',
  USE_CIRCUIT_ACCOUNT: process.env.NEXT_PUBLIC_USE_CIRCUIT_ACCOUNT === 'true',
  USE_CIRCUIT_USER_MANAGEMENT: process.env.NEXT_PUBLIC_USE_CIRCUIT_USER_MANAGEMENT === 'true',
  USE_CIRCUIT_FILE_MANAGER: process.env.NEXT_PUBLIC_USE_CIRCUIT_FILE_MANAGER === 'true',
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

