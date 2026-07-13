package com.smaily.skos.command

/**
 * آمار لحظه‌ای سیستم
 */
data class RuntimeStatistics(

    val scannedFiles: Long = 0,

    val scannedFolders: Long = 0,

    val knowledgeAssets: Long = 0,

    val bookGroups: Long = 0,

    val masterEditions: Long = 0,

    val publicationProjects: Long = 0,

    val runningMissions: Long = 0,

    val completedMissions: Long = 0

)
