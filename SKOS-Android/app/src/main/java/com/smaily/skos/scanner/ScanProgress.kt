package com.smaily.skos.scanner

data class ScanProgress(

    val stage: ScanStage,

    val foldersScanned: Int = 0,

    val filesScanned: Int = 0,

    val assetsCreated: Int = 0,

    val duplicates: Int = 0,

    val percent: Int = 0,

    val message: String = ""

)
