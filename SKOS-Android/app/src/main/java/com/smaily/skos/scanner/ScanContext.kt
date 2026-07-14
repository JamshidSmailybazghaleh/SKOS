package com.smaily.skos.scanner

import com.smaily.skos.engine.Mission

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Scan Context
 * ---------------------------------------------------------
 *
 * Holds the complete runtime context of a scan mission.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
data class ScanContext(

    /**
     * Related mission.
     */
    val mission: Mission,

    /**
     * Scanner configuration.
     */
    val configuration: ScanConfiguration,

    /**
     * Root paths to scan.
     */
    val rootPaths: List<String>,

    /**
     * Current scanning stage.
     */
    val currentStage: ScanStage = ScanStage.IDLE,

    /**
     * Current scan progress.
     */
    val progress: ScanProgress = ScanProgress(),

    /**
     * Scan start time.
     */
    val startedAt: Long = System.currentTimeMillis(),

    /**
     * Last update time.
     */
    val updatedAt: Long = System.currentTimeMillis()

) {

    /**
     * Returns true if there is at least one source.
     */
    fun hasSources(): Boolean =
        rootPaths.isNotEmpty()

    /**
     * Number of scan sources.
     */
    fun sourceCount(): Int =
        rootPaths.size

    /**
     * Returns true if scan is active.
     */
    fun isRunning(): Boolean =
        currentStage != ScanStage.IDLE &&
        !progress.isFinished()
}
