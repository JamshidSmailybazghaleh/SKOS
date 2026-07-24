async function loadExecutiveSummary() {

    try {

        const response = await fetch(
            "../data/executive-summary.json"
        );


        if (!response.ok) {

            throw new Error(
                "Executive Summary JSON not found"
            );

        }


        const data = await response.json();


        document.getElementById(
            "currentBuild"
        ).textContent =
            data.currentBuild;


        document.getElementById(
            "currentRelease"
        ).textContent =
            data.currentRelease;


        document.getElementById(
            "currentSprint"
        ).textContent =
            data.currentSprint;


        document.getElementById(
            "projectStatus"
        ).textContent =
            data.status;


        document.getElementById(
            "todayPriority"
        ).textContent =
            data.todayPriority;


        document.getElementById(
            "nextAction"
        ).textContent =
            data.nextAction;


    }

    catch(error) {

        console.error(
            "Executive Summary Module Error:",
            error
        );


        const status =
            document.getElementById(
                "projectStatus"
            );


        if(status){

            status.textContent =
                "ERROR";

        }

    }

}


loadExecutiveSummary();
