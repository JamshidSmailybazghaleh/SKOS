package com.smaily.skos.dashboard

data class DashboardState(

    val systemStatus: String = "ONLINE",

    val books: Int = 0,

    val samples: Int = 0,

    val published: Int = 0,

    val draft: Int = 0,

    val scannedFiles: Int = 0,

    val qualityScore: Int = 0,

    val pendingReview: Int = 0

)
