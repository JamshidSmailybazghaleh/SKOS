package com.smaily.skos.storage

import android.net.Uri

class StorageManager {


    private var selectedUri: Uri? = null


    fun setStorage(uri: Uri) {

        selectedUri = uri

    }


    fun getStorage(): Uri? {

        return selectedUri

    }


    fun isReady(): Boolean {

        return selectedUri != null

    }


    fun clear() {

        selectedUri = null

    }

}
