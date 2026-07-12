package com.smaily.skos.storage

import android.content.Context
import android.net.Uri

class StorageManager(
    private val context: Context
) {

    private var selectedStorageUri: Uri? = null

    fun setStorageUri(uri: Uri) {
        selectedStorageUri = uri
    }

    fun getStorageUri(): Uri? {
        return selectedStorageUri
    }

    fun hasStorage(): Boolean {
        return selectedStorageUri != null
    }

    fun clearStorage() {
        selectedStorageUri = null
    }

}
