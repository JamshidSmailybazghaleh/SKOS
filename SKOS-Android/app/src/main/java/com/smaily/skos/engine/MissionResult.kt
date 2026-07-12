package com.smaily.skos.engine

data class MissionResult(

    val success: Boolean,

    val message: String = "",

    val processedFiles: Int = 0,

    val processedFolders: Int = 0,

    val errors: Int = 0,

    val durationMillis: Long = 0L

)
