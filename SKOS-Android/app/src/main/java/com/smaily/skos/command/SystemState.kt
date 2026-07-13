package com.smaily.skos.command

/**
 * وضعیت کلی سیستم
 */
data class SystemState(

    val initialized: Boolean = false,

    val running: Boolean = false,

    val healthy: Boolean = true,

    val statistics: RuntimeStatistics = RuntimeStatistics()

)
