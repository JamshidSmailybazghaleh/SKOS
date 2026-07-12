package com.smaily.skos.engine

import java.util.PriorityQueue

/**
 * صف اصلی مأموریت‌های SKOS
 */
class MissionQueue {

    /**
     * صف اولویت‌دار مأموریت‌ها
     */
    private val queue = PriorityQueue<Mission>(
        compareBy<Mission> { it.priority.ordinal }
            .thenBy { it.createdAt }
    )

    /**
     * افزودن مأموریت
     */
    fun enqueue(mission: Mission) {
        queue.add(mission)
    }

    /**
     * دریافت مأموریت بعدی
     */
    fun dequeue(): Mission? {

        if (queue.isEmpty())
            return null

        return queue.poll()
    }

    /**
     * مشاهده مأموریت بعدی
     */
    fun peek(): Mission? {

        if (queue.isEmpty())
            return null

        return queue.peek()
    }

    /**
     * حذف همه مأموریت‌ها
     */
    fun clear() {

        queue.clear()

    }

    /**
     * تعداد مأموریت‌ها
     */
    fun size(): Int {

        return queue.size

    }

    /**
     * آیا صف خالی است؟
     */
    fun isEmpty(): Boolean {

        return queue.isEmpty()

    }

}
