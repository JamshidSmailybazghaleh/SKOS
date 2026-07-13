package com.smaily.skos.engine

data class MissionHistoryEntry(

    val missionId: String,

    val missionName: String,

    val missionType: MissionType,

    val startedAt: Long,

    val finishedAt: Long,

    val durationMillis: Long,

    val success: Boolean,

    val processedFolders: Int,

    val processedFiles: Int,

    val errors: Int,

    val message: String

)
