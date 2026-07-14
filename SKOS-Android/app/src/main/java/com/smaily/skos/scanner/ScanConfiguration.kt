package com.smaily.skos.scanner

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Scan Configuration
 * ---------------------------------------------------------
 *
 * Defines scanner behavior and execution options.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
data class ScanConfiguration(

    /**
     * Scan internal storage.
     */
    val scanInternalStorage: Boolean = true,

    /**
     * Scan external SD Card.
     */
    val scanSdCard: Boolean = true,

    /**
     * Scan cloud providers.
     */
    val scanCloud: Boolean = false,

    /**
     * Scan hidden files.
     */
    val includeHiddenFiles: Boolean = false,

    /**
     * Follow symbolic links.
     */
    val followSymbolicLinks: Boolean = false,

    /**
     * Detect duplicate files.
     */
    val detectDuplicates: Boolean = true,

    /**
     * Extract metadata.
     */
    val extractMetadata: Boolean = true,

    /**
     * Build Knowledge Assets.
     */
    val buildKnowledgeAssets: Boolean = true,

    /**
     * Register discovered assets.
     */
    val registerAssets: Boolean = true,

    /**
     * Generate statistics.
     */
    val generateStatistics: Boolean = true,

    /**
     * Generate scan report.
     */
    val generateReport: Boolean = true,

    /**
     * Maximum scanning depth.
     *
     * Int.MAX_VALUE means unlimited.
     */
    val maxDepth: Int = Int.MAX_VALUE,

    /**
     * Maximum file size to process.
     *
     * Long.MAX_VALUE means unlimited.
     */
    val maxFileSize: Long = Long.MAX_VALUE,

    /**
     * Number of worker threads.
     */
    val workerThreads: Int =
        Runtime.getRuntime()
            .availableProcessors()
            .coerceAt
