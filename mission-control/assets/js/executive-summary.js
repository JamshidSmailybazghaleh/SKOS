/*
====================================================
SKOS Mission Control

Executive Summary Module

File:
executive-summary.js

Version:
2.0

Status:
ACTIVE
====================================================
*/

const ExecutiveSummary = {

    data: null,



    async initialize() {

        console.log(
            "Initializing Executive Summary..."
        );

        await this.load();

        this.render();

    },



    async load() {

        try {

            this.data =

                window["executive-summaryData"];

            if (!this.data) {

                const response = await fetch(

                    CONFIG.paths.data +

                    "executive-summary.json"

                );

                this.data = await response.json();

            }

        }

        catch(error){

            console.error(error);

        }

    },



    render() {

        if(!this.data){

            return;

        }

        document.getElementById("currentBuild").textContent =
            this.data.currentBuild;

        document.getElementById("currentRelease").textContent =
            this.data.currentRelease;

        document.getElementById("currentSprint").textContent =
            this.data.currentSprint;

        document.getElementById("projectStatus").textContent =
            this.data.status;

        document.getElementById("todayPriority").textContent =
            this.data.todayPriority;

        document.getElementById("nextAction").textContent =
            this.data.nextAction;

        console.log(
            "Executive Summary Ready."
        );

    }

};

Object.freeze(ExecutiveSummary);
