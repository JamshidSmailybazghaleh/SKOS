package com.smaily.skos.engine

/**
 * نگهداری تاریخچه اجرای مأموریت‌ها
 */
object MissionHistory {

    /**
     * لیست مأموریت‌های ثبت شده
     */
    private val history = mutableListOf<MissionHistoryEntry>()

    /**
     * ثبت یک مأموریت
     */
    fun add(entry: MissionHistoryEntry) {

        history.add(entry)

    }

    /**
     * دریافت همه مأموریت‌ها
     */
    fun getAll(): List<MissionHistoryEntry> {

        return history.toList()

    }

    /**
     * آخرین مأموریت
     */
    fun last(): MissionHistoryEntry? {

        return history.lastOrNull()

    }

    /**
     * تعداد مأموریت‌ها
     */
    fun count(): Int {

        return history.size

    }

    /**
     * حذف تاریخچه
     */
    fun clear() {

        history.clear()

    }

}
