/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Operations Integration
 * Module    : Subsystem Information
 *
 * Build     : BUILD-000163
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {

    IntegrationHealth,
    IntegrationStatus

} from "./integration-status";

/**
 * Supported subsystem categories.
 */
export enum SubsystemCategory {

    Core = "core",

    Engine = "engine",

    Service = "service",

    Library = "library",

    Publication = "publication",

    AI = "ai",

    Storage = "storage",

    Integration = "integration",

    Monitoring = "monitoring"

}

/**
 * Subsystem metadata.
 */
export interface SubsystemInfo {

    /**
     * Unique subsystem identifier.
     */
    id: string;

    /**
     * Display name.
     */
    name: string;

    /**
     * Category.
     */
    category: SubsystemCategory;

    /**
     * Current version.
     */
    version: string;

    /**
     * Build identifier.
     */
    build: string;

    /**
     * Current integration status.
     */
    status: IntegrationStatus;

    /**
     * Current health level.
     */
    health: IntegrationHealth;

    /**
     * Indicates whether the subsystem is enabled.
     */
    enabled: boolean;

    /**
     * Startup order.
     */
    startupOrder: number;

    /**
     * Last update timestamp.
     */
    updatedAt: number;

}

/**
 * Factory for subsystem definitions.
 */
export class SubsystemFactory {

    /**
     * Create subsystem metadata.
     */
    public static create(

        id: string,

        name: string,

        category: SubsystemCategory,

        startupOrder: number

    ): SubsystemInfo {

        return {

            id,

            name,

            category,

            version: "0.1.0",

            build: "BUILD-000163",

            status: IntegrationStatus.Initializing,

            health: IntegrationHealth.Healthy,

            enabled: true,

            startupOrder,

            updatedAt: Date.now()

        };

    }

}
