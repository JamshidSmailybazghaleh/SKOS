package com.smaily.skos.engine

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Mission Priority
 * ---------------------------------------------------------
 *
 * Defines execution priority for every mission inside
 * the Mission Engine.
 *
 * Higher priority missions are executed before lower
 * priority missions unless dependencies prevent execution.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
enum class MissionPriority(val level: Int) {

    /**
     * Emergency operations.
     * Example:
     *  - Database recovery
     *  - Registry repair
     *  - Critical system failures
     */
    CRITICAL(100),

    /**
     * Very important system operations.
     * Example:
     *  - Scanner initialization
     *  - Registry synchronization
     */
    HIGH(75),

    /**
     * Normal user operations.
     * Example:
     *  - Standard scan
     *  - Metadata extraction
     */
    NORMAL(50),

    /**
     * Background operations.
     * Example:
     *  - Statistics generation
     *  - Cache updates
     */
    LOW(25),

    /**
     * Deferred operations.
     * Example:
     *  - Cleanup
     *  - Archive optimization
     */
    BACKGROUND(10);

    /**
     * Returns true if this priority is higher
     * than another priority.
     */
    fun isHigherThan(other: MissionPriority): Boolean =
        level > other
