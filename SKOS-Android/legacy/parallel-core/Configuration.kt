package com.smaily.skos.common

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * Configuration
 *
 * Immutable system configuration.
 *
 * This class contains global configuration values shared by
 * engines, services and pipelines.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
data class Configuration(

    /**
     * System name.
     */
    val systemName: String = "SKOS",

    /**
     * System version.
     */
    val systemVersion: String = "1.0.0",

    /**
     * Enables debug logging.
     */
    val debug: Boolean = false,

    /**
     * Maximum execution threads.
     */
    val maxThreads: Int = 4,

    /**
     * Default execution timeout (milliseconds).
     */
    val executionTimeout: Long = 30000L
)
