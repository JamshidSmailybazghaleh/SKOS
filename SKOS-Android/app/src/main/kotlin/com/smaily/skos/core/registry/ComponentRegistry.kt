package com.smaily.skos.core.registry

import com.smaily.skos.core.contracts.Component

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * ComponentRegistry
 *
 * Central registry for all SKOS components.
 *
 * Responsibilities:
 * - Component registration
 * - Component lookup
 * - Component removal
 * - Registry lifecycle
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class ComponentRegistry {

    /**
     * Registered components.
     */
    private val components =
        LinkedHashMap<String, Component>()

    /**
     * Registers a component.
     */
    fun register(
        component: Component
    ) {

        components[component.descriptor.id] =
            component
    }

    /**
     * Removes a component.
     */
    fun unregister(
        componentId: String
    ) {

        components.remove(componentId)
    }

    /**
     * Finds a component.
     */
    fun find(
        componentId: String
    ): Component? {

        return components[componentId]
    }

    /**
     * Checks whether a component exists.
     */
    fun contains(
        componentId: String
    ): Boolean {

        return components.containsKey(componentId)
    }

    /**
     * Returns all components.
     */
    fun all(): List<Component> {

        return components.values.toList()
    }

    /**
     * Number of registered components.
     */
    fun size(): Int {

        return components.size
    }

    /**
     * Clears the registry.
     */
    fun clear() {

        components.clear()
    }
}
