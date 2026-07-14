package com.smaily.skos.engine

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Mission Queue Manager
 * ---------------------------------------------------------
 *
 * Coordinates mission scheduling and queue management.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
class MissionQueueManager(
    private val missionQueue: MissionQueue = MissionQueue()
) {

    /**
     * Adds a mission to the execution queue.
     */
    fun submit(mission: Mission) {
        missionQueue.enqueue(mission)
    }

    /**
     * Returns the next mission for execution.
     */
    fun nextMission(): Mission? =
        missionQueue.dequeue()

    /**
     * Returns the next mission without removing it.
     */
    fun peekMission(): Mission? =
        missionQueue.peek()

    /**
     * Removes all queued missions.
     */
    fun clear() {
        missionQueue.clear()
    }

    /**
     * Number of waiting missions.
     */
    fun missionCount(): Int =
        missionQueue.size()

    /**
     * Returns true if no mission is waiting.
     */
    fun isEmpty(): Boolean =
        missionQueue.isEmpty()

    /**
     * Returns a snapshot of queued missions.
     */
    fun pendingMissions(): List<Mission> =
        missionQueue.snapshot()

    /**
     * Returns true if at least one mission
     * is currently in RUNNING state.
     */
    fun hasRunningMission(): Boolean =
        missionQueue
            .snapshot()
            .any { it.status == MissionStatus.RUNNING }
}
