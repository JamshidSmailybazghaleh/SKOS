package com.smaily.skos.engine

import com.smaily.skos.common.ComponentType
import java.util.concurrent.ConcurrentHashMap

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Engine Registry
 * ---------------------------------------------------------
 * Central registry of all SKOS engines.
 * ---------------------------------------------------------
 */
class EngineRegistry {

    /**
     * Registered engines.
     */
    private val engines =
        ConcurrentHashMap<ComponentType, Engine>()

    /**
     * Register engine.
     */
    fun register(engine: Engine): Boolean {

        return engines.putIfAbsent(
            engine.type,
            engine
        ) == null
    }

    /**
     * Remove engine.
     */
    fun unregister(type: ComponentType): Engine? {

        return engines.remove(type)
    }

    /**
     * Get engine.
     */
    fun get(type: ComponentType): Engine? {

        return engines[type]
    }

    /**
     * Check existence.
     */
    fun contains(type: ComponentType): Boolean {

        return engines.containsKey(type)
    }

    /**
     * All engines.
     */
    fun getAll(): List<Engine> {

        return engines.values.toList()
    }

    /**
     * Number of engines.
     */
    fun size(): Int {

        return engines.size
    }

    /**
     * Registry empty?
     */
    fun isEmpty(): Boolean {

        return engines.isEmpty()
    }

    /**
     * Remove everything.
     */
    fun clear() {

        engines.clear()
    }
}
