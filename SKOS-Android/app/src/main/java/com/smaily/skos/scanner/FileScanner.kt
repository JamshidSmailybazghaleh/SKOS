package com.smaily.skos.scanner

import android.content.Context
import android.net.Uri

class FileScanner(
    private val context: Context
) {

    fun scan(storageUri: Uri): Boolean {

        // BUILD-000200
        // نسخه اولیه فقط اعتبار URI را بررسی می‌کند.

        return storageUri.toString().isNotEmpty()

    }

}
