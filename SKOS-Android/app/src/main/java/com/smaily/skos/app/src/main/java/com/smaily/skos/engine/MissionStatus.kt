package com.smaily.skos.engine

/**
 * وضعیت استاندارد مأموریت‌های SKOS
 */
enum class MissionStatus {

    /**
     * ایجاد شده و در صف انتظار
     */
    QUEUED,

    /**
     * در انتظار منابع یا پیش‌نیازها
     */
    WAITING,

    /**
     * آماده اجرا
     */
    READY,

    /**
     * در حال اجرا
     */
    RUNNING,

    /**
     * متوقف شده توسط کاربر
     */
    PAUSED,

    /**
     * ادامه اجرای مأموریت
     */
    RESUMED,

    /**
     * با موفقیت پایان یافت
     */
    COMPLETED,

    /**
     * با خطا متوقف شد
     */
    FAILED,

    /**
     * توسط کاربر لغو شد
     */
    CANCELLED

}
