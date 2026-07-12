package com.smaily.skos.permission

import android.content.Context
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat

class PermissionManager(
    private val context: Context
) {

    fun checkPermission(permission: String): PermissionResult {

        val granted = ContextCompat.checkSelfPermission(
            context,
            permission
        ) == PackageManager.PERMISSION_GRANTED

        val state = if (granted) {
            PermissionState.GRANTED
        } else {
            PermissionState.DENIED
        }

        return PermissionResult(
            permission = permission,
            state = state,
            granted = granted
        )
    }

}
