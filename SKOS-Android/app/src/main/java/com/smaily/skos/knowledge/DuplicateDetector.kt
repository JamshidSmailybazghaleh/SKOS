package com.smaily.skos.knowledge

/**
 * موتور تشخیص نسخه‌های تکراری
 *
 * Version 1
 */
object DuplicateDetector {

    /**
     * بررسی وجود فایل مشابه
     */
    fun findDuplicate(

        asset: KnowledgeAsset,

        registry: List<KnowledgeAsset>

    ): KnowledgeAsset? {

        return registry.firstOrNull {

            normalize(it.path) == normalize(asset.path)

        }

    }

    /**
     * بررسی تکراری بودن
     */
    fun isDuplicate(

        asset: KnowledgeAsset,

        registry: List<KnowledgeAsset>

    ): Boolean {

        return findDuplicate(

            asset,

            registry

        ) != null

    }

    /**
     * نرمال‌سازی مسیر
     */
    private fun normalize(

        path: String

    ): String {

        return path

            .trim()

            .replace("\\", "/")

            .lowercase()

    }

}
