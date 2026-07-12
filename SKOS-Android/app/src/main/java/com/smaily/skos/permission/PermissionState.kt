/*
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * BUILD-000199
 * File : PermissionResult.kt
 * Version : 1.0.0
 * ==========================================================
 */

package com.smaily.skos.permission

data class PermissionResult(

    val permission: String,

    val state: PermissionState,

    val granted: Boolean

)
