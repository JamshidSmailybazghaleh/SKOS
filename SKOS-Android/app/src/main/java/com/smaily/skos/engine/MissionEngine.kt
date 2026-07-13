package com.smaily.skos.engine

import com.smaily.skos.scanner.ScannerEngine

/**
 * موتور مرکزی اجرای مأموریت‌های SKOS
 */
class MissionEngine(

    private val scannerEngine: ScannerEngine

) {

    private val scheduler = MissionScheduler()

    /**
     * ثبت مأموریت جدید
     */
    fun submit(

        mission: Mission

    ) {

        scheduler.submit(mission)

        MissionLogger.info(

            "Mission submitted : ${mission.name}"

        )

    }

    /**
     * اجرای مأموریت بعدی
     */
    fun executeNext(): MissionResult? {

        val mission = scheduler.nextMission()

            ?: return null

        val validation = MissionValidator.validate(mission)

        if (!validation.valid) {

            MissionLogger.missionFailed(

                mission,

                validation.message

            )

            return MissionResult(

                success = false,

                message = validation.message

            )

        }

        MissionLogger.missionStarted(mission)

        val dispatcher = MissionDispatcher(scannerEngine)

        val result = dispatcher.dispatch(mission)

        MissionLogger.missionCompleted(

            mission,

            result

        )

        MissionHistory.add(

            MissionHistoryEntry(

                missionId = mission.id,

                missionName = mission.name,

                missionType = mission.type,

                startedAt = System.currentTimeMillis(),

                finishedAt = System.currentTimeMillis(),

                durationMillis = result.durationMillis,

                success = result.success,

                processedFolders = result.processedFolders,

                processedFiles = result.processedFiles,

                errors = result.errors,

                message = result.message

            )

        )

        return result

    }

    /**
     * تعداد مأموریت‌های صف
     */
    fun pendingMissions(): Int {

        return scheduler.pendingCount()

    }

}
