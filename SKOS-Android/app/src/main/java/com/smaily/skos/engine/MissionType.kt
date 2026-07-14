package com.smaily.skos.engine

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Mission Type
 * ---------------------------------------------------------
 *
 * Defines all supported mission categories within SKOS.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
enum class MissionType {

    /**
     * System initialization.
     */
    INITIALIZATION,

    /**
     * Scan internal storage.
     */
    SCAN_INTERNAL_STORAGE,

    /**
     * Scan external SD Card.
     */
    SCAN_SD_CARD,

    /**
     * Scan cloud storage.
     */
    SCAN_CLOUD_STORAGE,

    /**
     * Register discovered assets.
     */
    REGISTER_ASSETS,

    /**
     * Extract metadata from files.
     */
    EXTRACT_METADATA,

    /**
     * Build Knowledge Objects.
     */
    BUILD_KNOWLEDGE_OBJECTS,

    /**
     * Detect duplicate assets.
     */
    DETECT_DUPLICATES,

    /**
     * Update Knowledge Registry.
     */
    UPDATE_REGISTRY,

    /**
     * Generate reports.
     */
    GENERATE_REPORT,

    /**
     * Update Dashboard.
     */
    UPDATE_DASHBOARD,

    /**
     * Backup project data.
     */
    BACKUP,

    /**
     * Restore project data.
     */
    RESTORE,

    /**
     * Synchronize repositories.
     */
    SYNCHRONIZE,

    /**
     * Archive completed missions.
     */
    ARCHIVE,

    /**
     * Maintenance operations.
     */
    MAINTENANCE
}
