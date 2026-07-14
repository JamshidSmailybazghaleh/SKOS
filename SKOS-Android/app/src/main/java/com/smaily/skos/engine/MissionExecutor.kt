package com.smaily.skos.engine

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Mission Executor
 * ---------------------------------------------------------
 *
 * Executes missions received from MissionQueueManager.
 *
 * This class is responsible only for mission lifecycle
 * management. Actual mission logic should be implemented
 * by dedicated handlers.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
class MissionExecutor {

    /**
     * Executes a mission.
     */
    fun execute(
        mission: Mission,
        action: () -> MissionResult
    ): MissionResult {

        return try {

            mission.start()

            val result = action()

            mission.complete(result)

            result

        } catch (exception: Exception) {

            val result = MissionResult(
                success = false,
                status = MissionStatus.FAILED,
                message = exception.message ?: "Unknown error",
                exception = exception
            )

            mission.complete(result)

            result
        }
    }
}
