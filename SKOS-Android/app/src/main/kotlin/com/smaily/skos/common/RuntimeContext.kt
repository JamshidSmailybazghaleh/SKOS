package com.smaily.skos.common

import java.time.Instant
import java.util.UUID

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * RuntimeContext
 *
 * Represents the execution context shared by engines,
 * services and pipelines.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
data class RuntimeContext(

    /**
     * Unique execution identifier.
     */
    val executionId: String = UUID.randomUUID().toString(),

    /**
     * Execution start timestamp.
     */
    val startedAt: Instant = Instant.now(),

    /**
     * Current user identifier.
     */
    val userId: String = "system",

    /**
     * Current session identifier.
     */
    val sessionId: String = UUID.randomUUID().toString(),

    /**
     * Working directory.
     */
    val workingDirectory: String = "",

    /**
     * Indicates whether the execution is interactive.
     */
    val interactive: Boolean = false
)
