package com.smaily.skos.knowledge

/**
 * رجیستری مرکزی دارایی‌های دانشی
 */
object KnowledgeRegistry {

    /**
     * مخزن اصلی دارایی‌ها
     */
    private val assets = mutableListOf<KnowledgeAsset>()

    /**
     * ثبت دارایی
     */
    fun register(

        asset: KnowledgeAsset

    ) {

        if (exists(asset.path))
            return

        assets.add(asset)

    }

    /**
     * بررسی وجود دارایی
     */
    fun exists(

        path: String

    ): Boolean {

        return assets.any {

            it.path == path

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

            it.path == path

        }

    }

    /**
     * تعداد دارایی‌ها
     */
    fun count(): Int {

        return assets.size

    }

    /**
     * حذف همه
     */
    fun clear() {

        assets.clear()

    }

}
