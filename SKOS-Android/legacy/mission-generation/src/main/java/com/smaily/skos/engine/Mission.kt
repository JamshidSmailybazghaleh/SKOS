package com.smaily.skos.engine

import java.time.LocalDateTime
import java.util.UUID

/**
 * SKOS Mission
 *
 * هر عملیات سیستم به صورت یک Mission تعریف می‌شود.
 */
data class Mission(

    /**
     * شناسه یکتا
     */
    val id: String = UUID.randomUUID().toString(),

    /**
     * عنوان ماموریت
     */
    val name: String,

    /**
     * توضیح ماموریت
     */
    val description: String = "",

    /**
     * نوع ماموریت
     */
    val type: MissionType,

    /**
     * اولویت
     */
    val priority: MissionPriority = MissionPriority.NORMAL,

    /**
     * وضعیت فعلی
     */
    val status: MissionStatus = MissionStatus.QUEUED,

    /**
     * زمان ایجاد
     */
    val createdAt: LocalDateTime = LocalDateTime.now(),

    /**
     * زمان شروع
     */
    val startedAt: LocalDateTime? = null,

    /**
     * زمان پایان
     */
    val finishedAt: LocalDateTime? = null,

    /**
     * درصد پیشرفت
     */
    val progress: Int = 0,

    /**
     * مسیر هدف
     */
    val targetPath: String? = null,

    /**
     * پیام وضعیت
     */
    val message: String = ""

)
