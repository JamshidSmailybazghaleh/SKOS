package com.smaily.skos.dashboard

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier

@Composable
fun DashboardScreen(

    viewModel: DashboardViewModel

) {

    val state by viewModel.state.collectAsState()

    Column(

        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(
                rememberScrollState()
            )

    ) {

        DashboardCard(
            "System",
            state.systemStatus
        )

        DashboardCard(
            "Books",
            state.books.toString()
        )

        DashboardCard(
            "Published",
            state.published.toString()
        )

        DashboardCard(
            "Samples",
            state.samples.toString()
        )

        DashboardCard(
            "Drafts",
            state.draft.toString()
        )

        DashboardCard(
            "Scanned Files",
            state.scannedFiles.toString()
        )

        DashboardCard(
            "Quality",
            "${state.qualityScore}%"
        )

        DashboardCard(
            "Pending Review",
            state.pendingReview.toString()
        )

    }

}
