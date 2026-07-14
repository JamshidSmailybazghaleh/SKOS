package com.smaily.skos.scanner

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Scan Statistics
 * ---------------------------------------------------------
 *
 * Stores statistical information collected during a scan.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
data class ScanStatistics(

    /**
     * Total directories discovered.
     */
    val directories: Long = 0,

    /**
     * Total files discovered.
     */
    val files: Long = 0,

    /**
     * Total processed files.
     */
    val processedFiles: Long = 0,

    /**
     * Total duplicate files.
     */
    val duplicateFiles: Long = 0,

    /**
     * Total registered assets.
     */
    val registeredAssets: Long = 0,

    /**
     * Total metadata extracted.
     */
    val extractedMetadata: Long = 0,

    /**
     * Total bytes scanned.
     */
    val totalBytes: Long = 0,

    /**
     * Total errors.
     */
    val errors: Long = 0,

    /**
     * Scan start timestamp.
     */
    val startedAt: Long = System.currentTimeMillis(),

    /**
     * Scan finish timestamp.
     */
    val finishedAt: Long = System.currentTimeMillis()

) {

    /**
     * Scan duration.
     */
    val durationMillis: Long
        get() = finishedAt - startedAt

    /**
     * Average bytes processed per second.
     */
    val bytesPerSecond: Double
        get() {

            if (durationMillis <= 0L)
                return 0.0

            return totalBytes.toDouble() /
                    (durationMillis.toDouble() / 1000.0)
        }

    /**
     * Returns true if scan contains errors.
     */
    fun hasErrors(): Boolean =
        errors > 0

    /**
     * Returns true if duplicate files were found.
     */
    fun hasDuplicates(): Boolean =
        duplicateFiles > 0

    /**
     * Returns processing completion percentage.
     */
    fun completionPercentage(): Int {

        if (files <= 0L)
            return 0

        return ((processedFiles * 100L) / files)
            .coerceIn(0L, 100L)
            .toInt()
    }
}
