package com.smaily.skos.core.container

import java.util.concurrent.ConcurrentHashMap

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * ServiceContainer
 *
 * Lightweight service container.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class ServiceContainer {

    private val services =
        ConcurrentHashMap<Class<*>, Any>()

    /**
     * Registers a service.
     */
    fun <T : Any> register(
        type: Class<T>,
        instance: T
    ) {
        services[type] = instance
    }

    /**
     * Resolves a service.
     */
    @Suppress("UNCHECKED_CAST")
    fun <T : Any> resolve(
        type: Class<T>
    ): T {

        return services[type] as? T
            ?: error(
                "Service not registered: ${type.name}"
            )
    }

    /**
     * Checks whether a service exists.
     */
    fun <T : Any> contains(
        type: Class<T>
    ): Boolean {

        return services.containsKey(type)
    }

    /**
     * Removes a service.
     */
    fun <T : Any> unregister(
        type: Class<T>
    ) {

        services.remove(type)
    }

    /**
     * Clears the container.
     */
    fun clear() {

        services.clear()
    }

    /**
     * Number of registered services.
     */
    fun size(): Int {

        return services.size
    }
}
