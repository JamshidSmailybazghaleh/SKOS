package com.smaily.skos.command

/**
 * SKOS Command Center
 *
 * مغز عملیاتی سیستم
 */
object CommandCenter {

    private val modules =
        mutableMapOf<ModuleType, ModuleStatus>()

    private var state = SystemState()

    /**
     * راه‌اندازی سیستم
     */
    fun initialize() {

        ModuleType.values().forEach {

            modules[it] = ModuleStatus.READY

        }

        state = state.copy(

            initialized = true,

            running = true

        )

    }

    /**
     * توقف سیستم
     */
    fun shutdown() {

        ModuleType.values().forEach {

            modules[it] = ModuleStatus.STOPPED

        }

        state = state.copy(

            running = false

        )

    }

    /**
     * وضعیت یک ماژول
     */
    fun moduleStatus(

        module: ModuleType

    ): ModuleStatus {

        return modules[module]

            ?: ModuleStatus.NOT_INITIALIZED

    }

    /**
     * تغییر وضعیت یک ماژول
     */
    fun updateModuleStatus(

        module: ModuleType,

        status: ModuleStatus

    ) {

        modules[module] = status

    }

    /**
     * وضعیت کلی سیستم
     */
    fun systemState(): SystemState {

        return state

    }

    /**
     * بروزرسانی آمار سیستم
     */
    fun updateStatistics(

        statistics: RuntimeStatistics

    ) {

        state = state.copy(

            statistics = statistics

        )

    }

    /**
     * سلامت سیستم
     */
    fun isHealthy(): Boolean {

        return state.healthy

    }

}
