package com.smaily.skos.recognition

import com.smaily.skos.knowledge.KnowledgeAsset

/**
 * انتخاب بهترین نسخه یک کتاب
 */
object MasterEdition {

    /**
     * انتخاب Master Edition
     */
    fun select(

        group: BookGroup

    ): KnowledgeAsset? {

        if (group.assets.isEmpty())
            return null

        return group.assets.maxByOrNull {

            calculateScore(it)

        }

    }

    /**
     * محاسبه امتیاز نسخه
     */
    private fun calculateScore(

        asset: KnowledgeAsset

    ): Double {

        var score = 0.0

        //----------------------------------
        // حجم فایل
        //----------------------------------

        score += asset.size / 1_000_000.0

        //----------------------------------
        // اطلاعات Metadata
        //----------------------------------

        if (!asset.metadata.title.isNullOrBlank())
            score += 5.0

        if (!asset.metadata.author.isNullOrBlank())
            score += 5.0

        if (!asset.metadata.language.isNullOrBlank())
            score += 2.0

        if (asset.metadata.keywords.isNotEmpty())
            score += 2.0

        //----------------------------------
        // فرمت فایل
        //----------------------------------

        when (

            asset.metadata.extension.lowercase()

        ) {

            "pdf" ->
                score += 10

            "epub" ->
                score += 9

            "mobi" ->
                score += 8

            "docx" ->
                score += 5

        }

        //----------------------------------
        // آخرین ویرایش
        //----------------------------------

        score +=

            asset.updatedAt / 1_000_000_000.0

        return score

    }

}
