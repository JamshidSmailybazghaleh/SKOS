package com.smaily.skos.scanner


/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Module : Scan Progress
 * Build  : BUILD-000201
 *
 * Responsibility:
 * نگهداری وضعیت اجرای اسکن
 *
 * ==========================================================
 */

data class ScanProgress(

    val totalFiles: Int = 0,

    val scannedFiles: Int = 0,

    val currentFile: String = "",

    val isRunning: Boolean = false

) {


    fun percentage(): Int {

        if (totalFiles == 0) {

            return 0

        }


        return (

                scannedFiles * 100

                ) / totalFiles

    }

}
