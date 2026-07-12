package com.smaily.skos.engine

class MissionExecutor(

    private val scannerEngine: ScannerEngine

) {

    fun execute(

        mission: Mission

    ): MissionResult {

        return when (mission.type) {

            MissionType.SCAN_FOLDER ->
                executeFolderScan(mission)

            MissionType.SCAN_INTERNAL_STORAGE ->
                executeInternalStorageScan(mission)

            MissionType.SCAN_SD_CARD ->
                executeSdCardScan(mission)

            else ->
                MissionResult(

                    success = false,

                    message = "Mission not implemented."

                )

        }

    }

    private fun executeFolderScan(

        mission: Mission

    ): MissionResult {

        val path = mission.targetPath

            ?: return MissionResult(

                false,

                "Target path is null."

            )

        return scannerEngine.scanFolder(path)

    }

    private fun executeInternalStorageScan(

        mission: Mission

    ): MissionResult {

        return MissionResult(

            false,

            "Internal Storage Scanner will be implemented."

        )

    }

    private fun executeSdCardScan(

        mission: Mission

    ): MissionResult {

        return MissionResult(

            false,

            "SD Scanner will be implemented."

        )

    }

}
