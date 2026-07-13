package com.smaily.skos.engine

import android.util.Log
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/**
 * SKOS Mission Logger
 *
 * ثبت تمام رویدادهای موتور اجرایی
 */
object MissionLogger {

    private const val TAG = "SKOS"

    private val formatter = SimpleDateFormat(
        "yyyy-MM-dd HH:mm:ss",
        Locale.getDefault()
    )

    private fun now(): String {

        return formatter.format(Date())

    }

    /**
     * ثبت پیام عمومی
     */
    fun info(message: String) {

        Log.i(TAG, "[${now()}] $message")

    }

    /**
     * ثبت هشدار
     */
    fun warning(message: String) {

        Log.w(TAG, "[${now()}] $message")

    }

    /**
     * ثبت خطا
     */
    fun error(message: String) {

        Log.e(TAG, "[${now()}] $message")

    }

    /**
     * شروع مأموریت
     */
    fun missionStarted(

        mission: Mission

    ) {

        Log.i(

            TAG,

            "[${now()}] Mission Started : ${mission.name}"

        )

    }

    /**
     * پایان موفق مأموریت
     */
    fun missionCompleted(

        mission: Mission,

        result: MissionResult

    ) {

        Log.i(

            TAG,

            """
            [${now()}]
            Mission Completed

            Name : ${mission.name}

            Success : ${result.success}

            Files : ${result.processedFiles}

            Folders : ${result.processedFolders}

            Errors : ${result.errors}

            Duration : ${result.durationMillis} ms
            """.trimIndent()

        )

    }

    /**
     * پایان ناموفق مأموریت
     */
    fun missionFailed(

        mission: Mission,

        reason: String

    ) {

        Log.e(

            TAG,

            """
            [${now()}]

            Mission Failed

            Name : ${mission.name}

            Reason : $reason
            """.trimIndent()

        )

    }

}
