package com.smaily.skos.scanner

interface ScanProgressListener {

    fun onFileScanned(
        scannedCount: Int,
        currentFileName: String
    )

}
