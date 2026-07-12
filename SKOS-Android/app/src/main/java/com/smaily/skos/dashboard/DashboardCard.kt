package com.smaily.skos.dashboard

import androidx.compose.foundation.layout.*
import androidx.compose.material3.Card
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun DashboardCard(

    title: String,

    value: String

) {

    Card(

        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)

    ) {

        Column(

            modifier = Modifier.padding(16.dp)

        ) {

            Text(title)

            Spacer(
                modifier = Modifier.height(8.dp)
            )

            Text(value)

        }

    }

}
