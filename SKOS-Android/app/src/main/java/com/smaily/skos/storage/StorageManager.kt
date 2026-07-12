package com.smaily.skos.storage

import android.net.Uri

/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Module : Storage Manager
 * Build  : BUILD-000201
 * Version: 1.0.0
 *
 * Responsibility:
 * مدیریت مسیرهای ذخیره‌سازی انتخاب‌شده توسط کاربر
 *
 * Supported:
 * - Internal Storage
 * - SD Card
 * - Future Cloud Storage URI
 *
 * ==========================================================
 */

class StorageManager {


    /**
     * URI انتخاب‌شده توسط کاربر
     */
    private var selectedStorageUri: Uri? = null



    /**
     * ثبت فضای ذخیره‌سازی انتخاب‌شده
     */
    fun setStorageUri(uri: Uri) {

        selectedStorageUri = uri

    }



    /**
     * دریافت URI ذخیره‌سازی
     */
    fun getStorageUri(): Uri? {

        return selectedStorageUri

    }



    /**
     * بررسی آماده بودن Storage
     */
    fun isReady(): Boolean {

        return selectedStorageUri != null

    }



    /**
     * پاک کردن Storage انتخاب‌شده
     */
    fun clearStorage() {

        selectedStorageUri = null

    }



    /**
     * تبدیل وضعیت Storage به متن
     * برای نمایش در UI
     */
    fun getStatus(): String {

        return if (isReady()) {

            "Storage Connected"

        } else {

            "No Storage Selected"

        }

    }

}
