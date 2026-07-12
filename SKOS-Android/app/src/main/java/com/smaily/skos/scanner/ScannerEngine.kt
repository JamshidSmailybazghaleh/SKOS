package com.smaily.skos.scanner

import android.content.Context
import androidx.documentfile.provider.DocumentFile
import com.smaily.skos.storage.StorageManager


/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Module : Scanner Engine
 * Build  : BUILD-000201
 * Version: 1.0.0
 *
 * Responsibility:
 * اتصال StorageManager به FileScanner
 *
 * Flow:
 *
 * Storage URI
 *      ↓
 * DocumentFile
 *      ↓
 * FileScanner
 *      ↓
 * ScannedFile List
 *
 * ==========================================================
 */

class ScannerEngine(
    private val context: Context,
    private val storageManager: StorageManager
) {


    private val fileScanner =
        FileScanner()



    fun executeScan(): List<ScannedFile> {


        val uri =
            storageManager.getStorageUri()
                ?: return emptyList()



        val rootDirectory =
            DocumentFile.fromTreeUri(
                context,
                uri
            )
                ?: return emptyList()



        return fileScanner.scan(
            rootDirectory
        )

    }

}
