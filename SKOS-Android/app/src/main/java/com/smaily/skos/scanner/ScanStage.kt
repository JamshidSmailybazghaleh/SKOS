package com.smaily.skos.scanner

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Scan Stage
 * ---------------------------------------------------------
 *
 * Represents the lifecycle stages of a scanning mission.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
enum class ScanStage {

    /**
     * Scan has not started yet.
     */
    IDLE,

    /**
     * Preparing scanner resources.
     */
    INITIALIZING,

    /**
     * Discovering storage locations.
     */
    DISCOVERING_SOURCES,

    /**
     * Walking directories.
     */
    WALKING_DIRECTORIES,

    /**
     * Reading file information.
     */
    DISCOVERING_FILES,

    /**
     * Extracting metadata.
     */
    EXTRACTING_METADATA,

    /**
     * Classifying assets.
     */
    CLASSIFYING,

    /**
     * Building Knowledge Assets.
     */
    BUILDING_ASSETS,

    /**
     * Registering assets.
     */
    REGISTERING,

    /**
     * Detecting duplicate assets.
     */
    DETECTING_DUPLICATES,

    /**
     * Calculating statistics.
     */
    GENERATING_STATISTICS,

    /**
     * Creating final report.
     */
    GENERATING_REPORT,

    /**
     * Updating dashboard.
     */
    UPDATING_DASHBOARD,

    /**
     * Scan completed successfully.
     */
    COMPLETED,

    /**
     * Scan cancelled.
     */
    CANCELLED,

    /**
     * Scan failed.
     */
    FAILED
}
