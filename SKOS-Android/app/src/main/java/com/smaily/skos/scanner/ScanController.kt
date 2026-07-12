package com.smaily.skos.scanner

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.withContext


/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Module : Scan Controller
 * Build  : BUILD-000201
 *
 * Responsibility:
 * مدیریت اجرای اسکن و ارسال وضعیت
 *
 * ==========================================================
 */

class ScanController(
    private val scannerEngine: ScannerEngine
) {


    private val _progress =
        MutableStateFlow(
            ScanProgress()
        )


    val progress: StateFlow<ScanProgress>
        get() = _progress



    suspend fun startScan():


            List<ScannedFile> {


        _progress.value =
            ScanProgress(
                isRunning = true
            )


        return withContext(
            Dispatchers.IO
        ) {


            val result =
                scannerEngine.executeScan()



            _progress.value =
                ScanProgress(

                    totalFiles = result.size,

                    scannedFiles = result.size,

                    currentFile = "Completed",

                    isRunning = false

                )


            result

        }

    }

}
