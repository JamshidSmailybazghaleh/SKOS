package com.smaily.skos.scanner

import kotlinx.coroutines.Dispatchers
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
 * اجرای اسکن خارج از Main Thread
 *
 * ==========================================================
 */

class ScanController(
    private val scannerEngine: ScannerEngine
) {


    suspend fun startScan():

            List<ScannedFile> {


        return withContext(
            Dispatchers.IO
        ) {

            scannerEngine.executeScan()

        }

    }

}
