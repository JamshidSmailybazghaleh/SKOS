package com.smaily.skos.engine

import java.util.PriorityQueue

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Mission Queue
 * ---------------------------------------------------------
 *
 * Stores missions waiting for execution.
 *
 * Missions are sorted by priority and creation time.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
class MissionQueue {

    /**
     * Internal priority queue.
     *
     * Higher priority missions are executed first.
     * If priorities are equal, older missions are executed first.
     */
    private val queue = PriorityQueue<Mission> { first, second ->

        when {

            first.priority.level != second.priority.level ->
                second.priority.level.compareTo(first.priority.level)

            else ->
                first.createdAt.compareTo(second.createdAt)
        }
    }

    /**
     * Add mission to queue.
     */
    fun enqueue(mission: Mission) {

        mission.queue()

        queue.add(mission)
    }

    /**
     * Remove next mission.
     */
    fun dequeue(): Mission? =
        if (queue.isEmpty()) null else queue.poll()

    /**
     * Returns next mission without removing it.
     */
    fun peek(): Mission? =
        queue.peek()

    /**
     * Remove all missions.
     */
    fun clear() =
        queue.clear()

    /**
     * Queue size.
     */
    fun size(): Int =
        queue.size

    /**
     * Returns true if queue is empty.
     */
    fun isEmpty(): Boolean =
        queue.isEmpty()

    /**
     * Returns true if queue contains missions.
     */
    fun isNotEmpty(): Boolean =
        queue.isNotEmpty()

    /**
     * Returns immutable list snapshot.
     */
    fun snapshot(): List<Mission> =
        queue.toList()
            .sortedWith(
                compareByDescending<Mission> { it.priority.level }
                    .thenBy { it.createdAt }
            )
}
