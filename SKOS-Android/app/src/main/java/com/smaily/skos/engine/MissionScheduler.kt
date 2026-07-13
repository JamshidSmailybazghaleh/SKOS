package com.smaily.skos.engine

import java.util.PriorityQueue

/**
 * SKOS Mission Scheduler
 *
 * مسئول زمان‌بندی اجرای مأموریت‌ها
 */
class MissionScheduler {

    /**
     * صف اولویت
     */
    private val queue = PriorityQueue<Mission>(
        compareBy<Mission> { it.priority.ordinal }
            .thenBy { it.createdAt }
    )

    /**
     * افزودن مأموریت
     */
    fun submit(
        mission: Mission
    ) {
        queue.add(mission)
    }

    /**
     * دریافت مأموریت بعدی
     */
    fun nextMission(): Mission? {

        if (queue.isEmpty())
            return null

        return queue.poll()

    }

    /**
     * مشاهده مأموریت بعدی
     */
    fun peekMission(): Mission? {

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
    fun pendingCount(): Int {

        return queue.size

    }

    /**
     * آیا مأموریتی وجود دارد؟
     */
    fun hasMission(): Boolean {

        return queue.isNotEmpty()

    }

}
