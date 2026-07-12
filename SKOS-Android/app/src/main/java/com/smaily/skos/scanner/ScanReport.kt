package com.smaily.skos.scanner

data class ScanReport(

    val success: Boolean,

    val folders: Int,

    val files: Int,

    val knowledgeAssets: Int,

    val duplicates: Int,

    val errors: Int,

    val durationMillis: Long

)
