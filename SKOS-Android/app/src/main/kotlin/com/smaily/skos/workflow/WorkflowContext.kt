package com.smaily.skos.workflow

import java.time.Instant
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * WorkflowContext
 *
 * Shared execution context for a workflow.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class WorkflowContext(

    /**
     * Workflow identifier.
     */
    val workflowId: String = UUID.randomUUID().toString(),

    /**
     * Workflow creation time.
     */
    val createdAt: Instant = Instant.now()

) {

    /**
     * Shared workflow variables.
     */
    private val variables =
        ConcurrentHashMap<String, Any>()

    /**
     * Stores a value.
     */
    fun put(
        key: String,
        value: Any
    ) {

        variables[key] = value
    }

    /**
     * Reads a value.
     */
    @Suppress("UNCHECKED_CAST")
    fun <T> get(
        key: String
    ): T? {

        return variables[key] as? T
    }

    /**
     * Checks existence.
     */
    fun contains(
        key: String
    ): Boolean {

        return variables.containsKey(key)
    }

    /**
     * Removes a value.
     */
    fun remove(
        key: String
    ) {

        variables.remove(key)
    }

    /**
     * Clears context.
     */
    fun clear() {

        variables.clear()
    }

    /**
     * Number of stored variables.
     */
    fun size(): Int {

        return variables.size
    }

    /**
     * Returns immutable snapshot.
     */
    fun snapshot(): Map<String, Any> {

        return variables.toMap()
    }
}
