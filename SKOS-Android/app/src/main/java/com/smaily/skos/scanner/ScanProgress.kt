package com.smaily.skos.scanner

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Scan Progress
 * ---------------------------------------------------------
 *
 * Immutable snapshot of the current scan progress.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
data class ScanProgress(

    /**
     * Current scan stage.
     */
    val stage: ScanStage = ScanStage.IDLE,

    /**
     * Total number of files expected.
     * صفر یعنی هنوز تعداد کل مشخص نشده است.
     */
    val totalFiles: Long = 0,

    /**
     * Number of processed files.
     */
    val processedFiles: Long = 0,

    /**
     * Number of successfully processed files.
     */
    val successfulFiles: Long = 0,

    /**
     * Number of failed files.
     */
    val failedFiles: Long = 0,

    /**
     * Number of discovered directories.
     */
    val directories: Long = 0,

    /**
     * Total scanned bytes.
     */
    val processedBytes: Long = 0,

    /**
     * Mission start time.
     */
    val startedAt: Long = System.currentTimeMillis(),

    /**
     * Last update time.
     */
    val updatedAt: Long = System.currentTimeMillis()
) {

    /**
     * Progress percentage.
     */
    val percentage: Int
        get() {

            if (totalFiles <= 0L)
                return 0

            return ((processedFiles * 100L) / totalFiles)
                .coerceIn(0L, 100L)
                .toInt()
        }

    /**
     * Remaining files.
     */
    val remainingFiles: Long
        get() = (totalFiles - processedFiles).coerceAtLeast(0)

    /**
     * Elapsed time.
     */
    val elapsedMillis: Long
        get() = updatedAt - startedAt

    /**
     * Average files per second.
     */
    val filesPerSecond: Double
        get() {

            if (elapsedMillis <= 0L)
                return 0.0

            return processedFiles.toDouble() /
                    (elapsedMillis.toDouble() / 1000.0)
        }

    /**
     * Returns true if scan has finished.
     */
    fun isFinished(): Boolean {

        return stage == ScanStage.COMPLETED ||
                stage == ScanStage.CANCELLED ||
                stage == ScanStage.FAILED
    }
}
