package com.smaily.skos.engine

import com.smaily.skos.scanner.ScannerEngine

/**
 * مسئول هدایت هر Mission
 * به موتور تخصصی مربوطه
 */
class MissionDispatcher(

    private val scannerEngine: ScannerEngine

) {

    fun dispatch(

        mission: Mission

    ): MissionResult {

        return when (mission.type) {

            MissionType.SCAN_FOLDER -> {

                scannerEngine.scanFolder(

                    mission.targetPath ?: ""

                )

            }

            MissionType.SCAN_INTERNAL_STORAGE -> {

                MissionResult(

                    success = false,

                    message = "Internal Storage Scanner not implemented."

                )

            }

            MissionType.SCAN_SD_CARD -> {

                MissionResult(

                    success = false,

                    message = "SD Card Scanner not implemented."

                )

            }

            MissionType.BUILD_SAMPLE -> {

                MissionResult(

                    success = false,

                    message = "Sample Builder not implemented."

                )

            }

            MissionType.BUILD_COMMERCIAL -> {

                MissionResult(

                    success = false,

                    message = "Commercial Builder not implemented."

                )

            }

            MissionType.BUILD_METADATA -> {

                MissionResult(

                    success = false,

                    message = "Metadata Builder not implemented."

                )

            }

            MissionType.PUBLISH_STORE -> {

                MissionResult(

                    success = false,

                    message = "Publication Engine not implemented."

                )

            }

            MissionType.PUBLISH_GITHUB -> {

                MissionResult(

                    success = false,

                    message = "GitHub Publisher not implemented."

                )

            }

            MissionType.BACKUP -> {

                MissionResult(

                    success = false,

                    message = "Backup Engine not implemented."

                )

            }

            MissionType.QUALITY_CHECK -> {

                MissionResult(

                    success = false,

                    message = "Quality Engine not implemented."

                )

            }

        }

    }

}
