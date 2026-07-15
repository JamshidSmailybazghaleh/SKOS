package com.smaily.skos.scan

import java.nio.file.Path

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * ScanResult
 *
 * Represents the result of a scan operation.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
data class ScanResult(

    /**
     * Indicates whether the scan completed successfully.
     */
    val successful: Boolean,

    /**
     * Root directory scanned.
     */
    val root: Path,

    /**
     * Files discovered during the scan.
     */
    val files: List<Path> = emptyList(),

    /**
     * Number of scanned directories.
     */
    val scannedDirectories: Int = 0,

    /**
     * Execution duration in milliseconds.
     */
    val durationMillis: Long = 0,

    /**
     * Optional message.
     */
    val message: String = "",

    /**
     * Optional error.
     */
    val error: Throwable? = null
) {

    /**
     * Number of discovered files.
     */
    val fileCount: Int
        get() = files.size

    /**
     * Returns true if no files were found.
     */
    fun isEmpty(): Boolean = files.isEmpty()

    companion object {

        /**
         * Creates a successful result.
         */
        fun success(
            root: Path,
            files: List<Path>,
            scannedDirectories: Int,
            durationMillis: Long
        ): ScanResult =
            ScanResult(
                successful = true,
                root = root,
                files = files,
                scannedDirectories = scannedDirectories,
                durationMillis = durationMillis
            )

        /**
         * Creates a failed result.
         */
        fun failure(
            root: Path,
            message: String,
            error: Throwable? = null
        ): ScanResult =
            ScanResult(
                successful = false,
                root = root,
                message = message,
                error = error
            )
    }
}
