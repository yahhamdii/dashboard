/**
 * Feature Flags for Circuit UI Migration
 *
 * Migration complète vers Circuit UI / Tailwind.
 * Tous les flags retournent true pour utiliser le nouveau système de styles.
 */

// ----------------------------------------------------------------------

/**
 * Migration flags - Tous activés (migration complète)
 */
export const MIGRATION_FLAGS = {
  USE_CIRCUIT_BUTTONS: true,
  USE_CIRCUIT_FORMS: true,
  USE_CIRCUIT_CARDS: true,
  USE_CIRCUIT_TABLES: true,
  USE_CIRCUIT_DIALOGS: true,
  USE_CIRCUIT_LAYOUTS: true,
  USE_CIRCUIT_TYPOGRAPHY: true,
  USE_CIRCUIT_NAVIGATION: true,
  USE_CIRCUIT_ERROR_PAGES: true,
  USE_CIRCUIT_DASHBOARD: true,
  USE_CIRCUIT_ACCOUNT: true,
  USE_CIRCUIT_USER_MANAGEMENT: true,
  USE_CIRCUIT_FILE_MANAGER: true,
  USE_CIRCUIT_LAYOUTS_DASHBOARD: true,
  USE_CIRCUIT_LAYOUTS_ACCOUNT: true,
  USE_CIRCUIT_LAYOUTS_USER_MANAGEMENT: true,
  USE_CIRCUIT_LAYOUTS_FILE_MANAGER: true,
  USE_CIRCUIT_LAYOUTS_ERROR_PAGES: true,
} as const;

// ----------------------------------------------------------------------

/**
 * Type for migration flag keys
 */
export type MigrationFlagKey = keyof typeof MIGRATION_FLAGS;

// ----------------------------------------------------------------------

/**
 * Hook to check if a specific migration flag is enabled
 * Retourne toujours true (migration complète)
 */
export function useCircuitComponent(_flag: MigrationFlagKey): boolean {
  return true;
}

// ----------------------------------------------------------------------

/**
 * Hook to check if USE_CIRCUIT_LAYOUTS is enabled
 * Retourne toujours true (migration complète)
 */
export function useCircuitLayouts(): boolean {
  return true;
}

/**
 * Hook version that uses Next.js usePathname
 * Retourne toujours true (migration complète)
 */
export function useCircuitLayoutsWithPathname(): boolean {
  return true;
}

// ----------------------------------------------------------------------

/**
 * Get all enabled migration flags
 */
export function getEnabledFlags(): MigrationFlagKey[] {
  return Object.keys(MIGRATION_FLAGS) as MigrationFlagKey[];
}

// ----------------------------------------------------------------------

/**
 * Check if any migration flags are enabled
 */
export function hasAnyCircuitEnabled(): boolean {
  return true;
}

// ----------------------------------------------------------------------

/**
 * Get migration progress percentage
 */
export function getMigrationProgress(): number {
  return 100;
}
