package com.smaily.skos.engine

object MissionQueueManager {

    private val queue = MissionQueue()

    fun submit(

        mission: Mission

    ) {

        queue.enqueue(mission)

    }

    fun nextMission(): Mission? {

        return queue.dequeue()

    }

    fun pendingCount(): Int {

        return queue.size()

    }

    fun hasMission(): Boolean {

        return !queue.isEmpty()

    }

}
