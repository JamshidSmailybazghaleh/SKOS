package com.smaily.skos.pipeline

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * PipelineContext
 *
 * Shared execution context for pipeline stages.
 *
 * Carries temporary execution data between stages.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class PipelineContext {

    /**
     * Internal storage.
     */
    private val values =
        mutableMapOf<String, Any>()

    /**
     * Stores a value.
     */
    fun put(
        key: String,
        value: Any
    ) {
        values[key] = value
    }

    /**
     * Returns a value.
     */
    @Suppress("UNCHECKED_CAST")
    fun <T> get(key: String): T? =
        values[key] as? T

    /**
     * Returns true if key exists.
     */
    fun contains(key: String): Boolean =
        values.containsKey(key)

    /**
     * Removes a value.
     */
    fun remove(key: String) {
        values.remove(key)
    }

    /**
     * Clears the context.
     */
    fun clear() {
        values.clear()
    }

    /**
     * Number of stored values.
     */
    fun size(): Int =
        values.size

    /**
     * Returns true if context is empty.
     */
    fun isEmpty(): Boolean =
        values.isEmpty()
}
