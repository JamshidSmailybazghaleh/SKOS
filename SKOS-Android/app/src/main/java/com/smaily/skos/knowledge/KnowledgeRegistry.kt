package com.smaily.skos.knowledge

/**
 * رجیستری مرکزی دارایی‌های دانشی SKOS
 */
object KnowledgeRegistry {

    /**
     * مخزن اصلی دارایی‌های دانشی
     */
    private val assets = mutableListOf<KnowledgeAsset>()

    /**
     * ثبت دارایی جدید
     */
    fun register(
        asset: KnowledgeAsset
    ): Boolean {

        if (
            DuplicateDetector.isDuplicate(
                asset,
                assets
            )
        ) {
            return false
        }

        assets.add(asset)

        return true

    }

    /**
     * بررسی وجود دارایی بر اساس مسیر
     */
    fun exists(
        path: String
    ): Boolean {

        return assets.any {

            it.path.equals(
                path,
                ignoreCase = true
            )

        }

    }

    /**
     * دریافت همه دارایی‌ها
     */
    fun getAll(): List<KnowledgeAsset> {

        return assets.toList()

    }

    /**
     * جستجو بر اساس شناسه
     */
    fun findById(
        id: String
    ): KnowledgeAsset? {

        return assets.find {

            it.id == id

        }

    }

    /**
     * جستجو بر اساس مسیر
     */
    fun findByPath(
        path: String
    ): KnowledgeAsset? {

        return assets.find {

            it.path.equals(
                path,
                ignoreCase = true
            )

        }

    }

    /**
     * حذف یک دارایی
     */
    fun remove(
        asset: KnowledgeAsset
    ): Boolean {

        return assets.remove(asset)

    }

    /**
     * تعداد دارایی‌های ثبت‌شده
     */
    fun count(): Int {

        return assets.size

    }

    /**
     * آیا رجیستری خالی است؟
     */
    fun isEmpty(): Boolean {

        return assets.isEmpty()

    }

    /**
     * پاک‌سازی کامل رجیستری
     */
    fun clear() {

        assets.clear()

    }

}
