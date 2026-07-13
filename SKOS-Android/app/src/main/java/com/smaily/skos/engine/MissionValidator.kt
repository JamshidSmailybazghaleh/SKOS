package com.smaily.skos.engine

import java.io.File

/**
 * اعتبارسنجی مأموریت‌های SKOS
 */
object MissionValidator {

    /**
     * بررسی کامل مأموریت
     */
    fun validate(
        mission: Mission
    ): ValidationResult {

        // نام مأموریت
        if (mission.name.isBlank()) {

            return ValidationResult(
                valid = false,
                message = "Mission name is empty."
            )

        }

        // وضعیت مأموریت
        if (!mission.status.canStart()) {

            return ValidationResult(
                valid = false,
                message = "Mission status is not executable."
            )

        }

        // بررسی مسیر در مأموریت‌های اسکن
        when (mission.type) {

            MissionType.SCAN_FOLDER -> {

                val path = mission.targetPath

                if (path.isNullOrBlank()) {

                    return ValidationResult(
                        valid = false,
                        message = "Target path is empty."
                    )

                }

                val folder = File(path)

                if (!folder.exists()) {

                    return ValidationResult(
                        valid = false,
                        message = "Folder does not exist."
                    )

                }

                if (!folder.isDirectory) {

                    return ValidationResult(
                        valid = false,
                        message = "Target is not a directory."
                    )

                }

            }

            else -> {
                // سایر مأموریت‌ها در Sprintهای آینده
            }

        }

        return ValidationResult(
            valid = true,
            message = "Mission validated successfully."
        )

    }

}
