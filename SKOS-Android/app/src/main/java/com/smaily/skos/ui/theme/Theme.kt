/*
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * BUILD-000197
 * Theme.kt
 *
 * Version 1.0.0
 * ==========================================================
 */

package com.smaily.skos.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

private val SKOSDarkColorScheme = darkColorScheme()

@Composable
fun SKOSTheme(

    content: @Composable () -> Unit

) {

    MaterialTheme(

        colorScheme = SKOSDarkColorScheme,

        typography = Typography,

        content = content

    )

}
