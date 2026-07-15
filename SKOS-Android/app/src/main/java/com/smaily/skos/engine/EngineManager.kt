package com.smaily.skos.engine

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Engine Manager
 * ---------------------------------------------------------
 * Controls the lifecycle of all registered engines.
 * ---------------------------------------------------------
 */
class EngineManager(

    private val registry: EngineRegistry

) {

    /**
     * Initialize all engines.
     */
    fun initializeAll() {

        registry
            .getAll()
            .sortedBy { it.priority }
            .forEach {
                it.initialize()
            }
    }

    /**
     * Start all engines.
     */
    fun startAll() {

        registry
            .getAll()
            .sortedBy { it.priority }
            .forEach {
                it.start()
            }
    }

    /**
     * Execute all engines.
     */
    fun executeAll() {

        registry
            .getAll()
            .sortedBy { it.priority }
            .forEach {
                if (it.validate()) {
                    it.execute()
                }
            }
    }

    /**
     * Stop all engines.
     */
    fun stopAll() {

        registry
            .getAll()
            .sortedByDescending { it.priority }
            .forEach {
                it.stop()
            }
    }

    /**
     * Shutdown all engines.
     */
    fun shutdownAll() {

        registry
            .getAll()
            .sortedByDescending { it.priority }
            .forEach {
                it.shutdown()
            }
    }

    /**
     * Reset all engines.
     */
    fun resetAll() {

        registry
            .getAll()
            .forEach {
                it.reset()
            }
    }
}
