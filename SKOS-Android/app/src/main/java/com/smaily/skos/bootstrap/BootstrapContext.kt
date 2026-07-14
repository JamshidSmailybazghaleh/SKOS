package com.smaily.skos.bootstrap

import java.io.Serializable
import java.time.Instant
import java.util.UUID

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Bootstrap Context
 * ---------------------------------------------------------
 * Holds runtime information during the bootstrap process.
 *
 * Version : Alpha 0.1
 * ---------------------------------------------------------
 */

data class BootstrapContext(

    /**
     * Unique Bootstrap Session ID.
     */
    val sessionId: String = UUID.randomUUID().toString(),

    /**
     * Bootstrap start time.
     */
    val startedAt: Instant = Instant.now(),

    /**
     * Bootstrap configuration.
     */
    val configuration: BootstrapConfiguration,

    /**
     * Current bootstrap stage.
     */
    var stage: BootstrapStage = BootstrapStage.INITIALIZING,

    /**
     * Current bootstrap status.
     */
    var status: BootstrapStatus = BootstrapStatus.CREATED,

    /**
     * Progress percentage.
     */
    var progress: Int = 0,

    /**
     * Status message.
     */
    var message: String = "Bootstrap created.",

    /**
     * Total elapsed time (milliseconds).
     */
    var elapsedTimeMillis: Long = 0L

) : Serializable {

    /**
     * Move to next stage.
     */
    fun moveTo(
        stage: BootstrapStage,
        progress: Int,
        message: String
    ) {
        this.stage = stage
        this.progress = progress.coerceIn(0, 100)
        this.message = message
    }

    /**
     * Mark bootstrap as completed.
     */
    fun complete() {
        status = BootstrapStatus.COMPLETED
        stage = BootstrapStage.COMPLETED
        progress = 100
        message = "Bootstrap completed successfully."
    }

    /**
     * Mark bootstrap as failed.
     */
    fun fail(reason: String) {
        status = BootstrapStatus.FAILED
        message = reason
    }

    /**
     * Bootstrap running?
     */
    fun isRunning(): Boolean =
        status == BootstrapStatus.RUNNING

    /**
     * Bootstrap completed?
     */
    fun isCompleted(): Boolean =
        status == BootstrapStatus.COMPLETED
}

/**
 * Bootstrap execution stages.
 */
enum class BootstrapStage {

    INITIALIZING,

    LOADING_CONFIGURATION,

    INITIALIZING_KERNEL,

    INITIALIZING_ENGINES,

    VERIFYING_SYSTEM,

    COMPLETED

}

/**
 * Bootstrap execution status.
 */
enum class BootstrapStatus {

    CREATED,

    RUNNING,

    COMPLETED,

    FAILED

}
