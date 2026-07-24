async function loadExecutiveSummary() {

    try {

        const response = await fetch(
            "../data/executive-summary.json"
        );

        const data = await response.json();


        document.getElementById(
            "currentBuild"
        ).textContent = data.currentBuild;


        document.getElementById(
            "currentRelease"
        ).textContent = data.currentRelease;


        document.getElementById(
            "currentSprint"
        ).textContent = data.currentSprint;


        document.getElementById(
            "projectStatus"
        ).textContent = data.status;


        document.getElementById(
            "todayPriority"
        ).textContent = data.todayPriority;


        document.getElementById(
            "nextAction"
        ).textContent = data.nextAction;


    }

    catch(error) {

        console.error(
            "Executive Summary loading error:",
            error
        );

    }

}


loadExecutiveSummary();
