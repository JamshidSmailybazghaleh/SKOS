package com.smaily.skos.engine

import java.util.UUID

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Mission
 * ---------------------------------------------------------
 *
 * Represents a single executable mission.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
data class Mission(

    /**
     * Unique mission identifier.
     */
    val id: String = UUID.randomUUID().toString(),

    /**
     * Mission title.
     */
    val title: String,

    /**
     * Optional description.
     */
    val description: String = "",

    /**
     * Mission type.
     */
    val type: MissionType,

    /**
     * Mission priority.
     */
    val priority: MissionPriority = MissionPriority.NORMAL,

    /**
     * Current mission status.
     */
    var status: MissionStatus = MissionStatus.CREATED,

    /**
     * Creation timestamp.
     */
    val createdAt: Long = System.currentTimeMillis(),

    /**
     * Execution start time.
     */
    var startedAt: Long? = null,

    /**
     * Execution finish time.
     */
    var finishedAt: Long? = null,

    /**
     * Mission progress (0..100).
     */
    var progress: Int = 0,

    /**
     * Optional execution result.
     */
    var result: MissionResult? = null

) {

    /**
     * Mark mission as queued.
     */
    fun queue() {
        status = MissionStatus.QUEUED
    }

    /**
     * Start mission execution.
     */
    fun start() {
        status = MissionStatus.RUNNING
        startedAt = System.currentTimeMillis()
    }

    /**
     * Pause mission.
     */
    fun pause() {
        status = MissionStatus.PAUSED
    }

    /**
     * Resume mission.
     */
    fun resume() {
        status = MissionStatus.RESUMED
    }

    /**
     * Update mission progress.
     */
    fun updateProgress(value: Int) {
        progress = value.coerceIn(0, 100)
    }

    /**
     * Complete mission.
     */
    fun complete(result: MissionResult) {
        this.result = result
        this.status = result.status
        this.progress = 100
        this.finishedAt = System.currentTimeMillis()
    }

    /**
     * Cancel mission.
     */
    fun cancel() {
        status = MissionStatus.CANCELLED
        finishedAt = System.currentTimeMillis()
    }

    /**
     * Execution duration in milliseconds.
     */
    fun duration(): Long? {

        if (startedAt == null || finishedAt == null)
            return null

        return finishedAt!! - startedAt!!
    }

    /**
     * Returns true if mission has finished.
     */
    fun isFinished(): Boolean =
        status == MissionStatus.COMPLETED ||
        status == MissionStatus.COMPLETED_WITH_WARNINGS ||
        status == MissionStatus.FAILED ||
        status == MissionStatus.CANCELLED
}
