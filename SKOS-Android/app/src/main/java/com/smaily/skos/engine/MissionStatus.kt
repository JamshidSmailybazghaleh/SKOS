package com.smaily.skos.engine

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Mission Status
 * ---------------------------------------------------------
 *
 * Defines the lifecycle state of every mission executed
 * by the SKOS Mission Engine.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
enum class MissionStatus {

    /**
     * Mission has been created but not yet scheduled.
     */
    CREATED,

    /**
     * Mission is waiting in the execution queue.
     */
    QUEUED,

    /**
     * Mission is preparing required resources.
     */
    PREPARING,

    /**
     * Mission is currently running.
     */
    RUNNING,

    /**
     * Mission execution has been temporarily suspended.
     */
    PAUSED,

    /**
     * Mission execution resumed after pause.
     */
    RESUMED,

    /**
     * Mission completed successfully.
     */
    COMPLETED,

    /**
     * Mission completed with warnings.
     */
    COMPLETED_WITH_WARNINGS,

    /**
     * Mission failed because of an error.
     */
    FAILED,

    /**
     * Mission has been cancelled by the user or system.
     */
    CANCELLED,

    /**
     * Mission execution timed out.
     */
    TIMEOUT,

    /**
     * Mission was skipped intentionally.
     */
    SKIPPED,

    /**
     * Mission has been archived.
     */
    ARCHIVED
}
