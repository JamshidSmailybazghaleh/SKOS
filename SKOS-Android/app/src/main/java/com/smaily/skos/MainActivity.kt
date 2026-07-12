package com.smaily.skos

import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp


class MainActivity : ComponentActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)

        setContent {

            SKOSApp()

        }

    }

}


@Composable
fun SKOSApp() {


    var selectedUri by remember {

        mutableStateOf<Uri?>(null)

    }


    val folderPicker =
        rememberLauncherForActivityResult(
            contract =
            ActivityResultContracts.OpenDocumentTree()
        ) { uri ->

            selectedUri = uri

        }



    MaterialTheme {


        Surface(
            modifier = Modifier.fillMaxSize()
        ) {


            Column(

                modifier = Modifier
                    .fillMaxSize()
                    .padding(24.dp),

                horizontalAlignment =
                    Alignment.CenterHorizontally,

                verticalArrangement =
                    Arrangement.Center

            ) {


                Text("SKOS")


                Spacer(
                    modifier = Modifier.height(12.dp)
                )


                Text(
                    "Smaily Knowledge Operating System"
                )


                Spacer(
                    modifier = Modifier.height(24.dp)
                )


                Button(

                    onClick = {

                        folderPicker.launch(null)

                    }

                ) {

                    Text(
                        "Select Storage"
                    )

                }


                Spacer(
                    modifier = Modifier.height(24.dp)
                )


                Text(
                    if(selectedUri != null)

                        "Storage Selected"

                    else

                        "No Storage Selected"
                )


            }

        }

    }

}
