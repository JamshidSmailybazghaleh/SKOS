package com.smaily.skos.scan

import java.nio.file.Path

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * ScanRequest
 *
 * Immutable request object used by ScanEngine.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
data class ScanRequest(

    /**
     * Root directory to scan.
     */
    val root: Path,

    /**
     * Scan sub-directories recursively.
     */
    val recursive: Boolean = true,

    /**
     * Include hidden files.
     */
    val includeHidden: Boolean = false,

    /**
     * Allowed file extensions.
     *
     * Empty set means all extensions.
     */
    val extensions: Set<String> = emptySet(),

    /**
     * Maximum scan depth.
     *
     * Int.MAX_VALUE means unlimited.
     */
    val maxDepth: Int = Int.MAX_VALUE
) {

    init {
        require(maxDepth > 0) {
            "Maximum depth must be greater than zero."
        }
    }
}
