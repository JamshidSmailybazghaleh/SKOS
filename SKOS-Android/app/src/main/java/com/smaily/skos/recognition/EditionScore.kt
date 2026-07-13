package com.smaily.skos.recognition

/**
 * امتیازدهی کامل یک نسخه کتاب
 */
data class EditionScore(

    val metadataScore: Double,

    val fileQualityScore: Double,

    val recencyScore: Double,

    val completenessScore: Double,

    val duplicateConfidence: Double,

    val finalScore: Double

)
