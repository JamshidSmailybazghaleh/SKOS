package com.smaily.skos.knowledge

/**
 * رجیستری مرکزی دارایی‌های دانشی SKOS
 *
 * مسئول ثبت، جستجو و مدیریت KnowledgeAsset ها
 */
object KnowledgeRegistry {

    /**
     * مخزن اصلی دارایی‌های دانشی
     */
    private val assets = mutableListOf<KnowledgeAsset>()

    /**
     * ثبت دارایی جدید
     *
     * @return true اگر ثبت انجام شد
     * @return false اگر نسخه تکراری باشد
     */
    fun register(
        asset: KnowledgeAsset
    ): Boolean {

        val similarity = DuplicateDetector.compare(
            asset,
            assets
        )

        if (similarity.duplicated) {
            return false
        }

        assets.add(asset)

        return true
    }

    /**
     * بررسی وجود دارایی
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
     * دریافت همه دارایی‌ها
     */
    fun getAll(): List<KnowledgeAsset> {

        return assets.toList()

    }

    /**
     * تعداد دارایی‌ها
     */
    fun count(): Int {

        return assets.size

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
     * حذف بر اساس شناسه
     */
    fun removeById(
        id: String
    ): Boolean {

        val asset = findById(id)

        return if (asset != null) {

            assets.remove(asset)

        } else {

            false

        }

    }

    /**
     * پاک‌سازی رجیستری
     */
    fun clear() {

        assets.clear()

    }

    /**
     * بررسی خالی بودن رجیستری
     */
    fun isEmpty(): Boolean {

        return assets.isEmpty()

    }

}
