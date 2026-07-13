package com.smaily.skos.knowledge

/**
 * SKOS Duplicate Detector
 *
 * Version 2
 *
 * تشخیص نسخه‌های تکراری و مشابه
 */
object DuplicateDetector {

    /**
     * مقایسه یک Asset با Registry
     */
    fun compare(

        asset: KnowledgeAsset,

        registry: List<KnowledgeAsset>

    ): SimilarityResult {

        registry.forEach { existing ->

            val score = similarityScore(

                asset,

                existing

            )

            if (score >= 0.90) {

                return SimilarityResult(

                    duplicated = true,

                    score = score,

                    matchedAsset = existing

                )

            }

        }

        return SimilarityResult(

            duplicated = false,

            score = 0.0,

            matchedAsset = null

        )

    }

    /**
     * بررسی تکراری بودن
     */
    fun isDuplicate(

        asset: KnowledgeAsset,

        registry: List<KnowledgeAsset>

    ): Boolean {

        return compare(

            asset,

            registry

        ).duplicated

    }

    /**
     * محاسبه میزان شباهت
     */
    private fun similarityScore(

        first: KnowledgeAsset,

        second: KnowledgeAsset

    ): Double {

        var score = 0.0

        // مسیر فایل
        if (

            normalize(first.path) ==

            normalize(second.path)

        ) {

            score += 0.60

        }

        // نام فایل
        if (

            normalize(first.name) ==

            normalize(second.name)

        ) {

            score += 0.30

        }

        // اندازه فایل
        if (

            first.size == second.size

        ) {

            score += 0.10

        }

        return score

    }

    /**
     * نرمال‌سازی متن
     */
    private fun normalize(

        text: String

    ): String {

        return text

            .trim()

            .replace("\\", "/")

            .replace("_", " ")

            .replace("-", " ")

            .lowercase()

    }

}
