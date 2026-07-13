package com.smaily.skos.command

/**
 * وضعیت اجرای ماژول
 */
enum class ModuleStatus {

    NOT_INITIALIZED,

    INITIALIZING,

    READY,

    RUNNING,

    PAUSED,

    STOPPED,

    ERROR

}
