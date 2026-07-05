/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Persistence
 * Module    : Cache Manager
 *
 * Build     : BUILD-000098
 * Sprint    : Sprint 13
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface CacheEntry {

    key: string;

    value: unknown;

    createdAt: Date;

}

export class CacheManager {

    private readonly cache =
        new Map<string, CacheEntry>();

    /**
     * Store value in cache.
     */
    public set(

        key: string,

        value: unknown

    ): void {

        this.cache.set(

            key,

            {

                key,

                value,

                createdAt: new Date()

            }

        );

    }

    /**
     * Read value from cache.
     */
    public get<T = unknown>(

        key: string

    ): T | undefined {

        const entry = this.cache.get(key);

        return entry?.value as T | undefined;

    }

    /**
     * Check if key exists.
     */
    public has(

        key: string

    ): boolean {

        return this.cache.has(key);

    }

    /**
     * Remove cached value.
     */
    public delete(

        key: string

    ): boolean {

        return this.cache.delete(key);

    }

    /**
     * Clear entire cache.
     */
    public clear(): void {

        this.cache.clear();

    }

    /**
     * Number of cached entries.
     */
    public size(): number {

        return this.cache.size;

    }

}
