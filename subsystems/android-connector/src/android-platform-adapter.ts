/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Module : Android Platform Adapter
 * Build  : BUILD-000178
 * ==========================================================
 */

export interface AndroidPlatformAdapter {

    /**
     * Platform initialization.
     */
    initialize(): Promise<boolean>;

    /**
     * Return Android version.
     */
    getPlatformVersion(): Promise<string>;

    /**
     * Return available storage roots.
     */
    getStorageRoots(): Promise<string[]>;

    /**
     * Check storage availability.
     */
    isStorageAvailable(): Promise<boolean>;

}
