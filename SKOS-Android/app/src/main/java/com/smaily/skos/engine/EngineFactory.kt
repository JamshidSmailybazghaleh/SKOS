package com.smaily.skos.engine

import com.smaily.skos.common.ComponentType
import com.smaily.skos.common.Configuration
import com.smaily.skos.common.RuntimeContext

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Engine Factory
 * ---------------------------------------------------------
 * Responsible for creating SKOS engine instances.
 * ---------------------------------------------------------
 */
object EngineFactory {

    /**
     * Creates an engine by its type.
     *
     * @throws IllegalArgumentException if the engine type
     * is not supported.
     */
    fun create(
        type: ComponentType,
        configuration: Configuration,
        runtime: RuntimeContext
    ): Engine {

        return when (type) {

            ComponentType.MISSION ->
                MissionEngine(configuration, runtime)

            ComponentType.SCANNER ->
                ScannerEngine(configuration, runtime)

            ComponentType.REGISTRY ->
                RegistryEngine(configuration, runtime)

            ComponentType.PROCESSING ->
                ProcessingEngine(configuration, runtime)

            ComponentType.SEARCH ->
                SearchEngine(configuration, runtime)

            else ->
                throw IllegalArgumentException(
                    "Unsupported engine type: $type"
                )
        }
    }
}
