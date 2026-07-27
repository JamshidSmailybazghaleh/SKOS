/*
====================================================
SKOS Mission Control

Executive Summary Module

File:
executive-summary.js

Version:
3.0

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

                if (!response.ok) {

                    throw new Error(
                        "executive-summary.json not found."
                    );

                }

                this.data =
                    await response.json();

            }

            console.log(
                "Executive Summary Data Loaded."
            );

        }

        catch (error) {

            console.error(
                "Executive Summary Load Error:",
                error
            );

            this.data = null;

        }

    },

    render() {

        if (!this.data) {

            console.warn(
                "Executive Summary Data Empty."
            );

            return;

        }

        document.getElementById(
            "currentBuild"
        ).textContent =
            this.data.currentBuild;

        document.getElementById(
            "currentRelease"
        ).textContent =
            this.data.currentRelease;

        document.getElementById(
            "currentSprint"
        ).textContent =
            this.data.currentSprint;

        document.getElementById(
            "projectStatus"
        ).textContent =
            this.data.status;

        document.getElementById(
            "todayPriority"
        ).textContent =
            this.data.todayPriority;

        document.getElementById(
            "nextAction"
        ).textContent =
            this.data.nextAction;

        console.log(
            "Executive Summary Ready."
        );

    }

};

/* ============================================
Register Module
============================================ */

window.ExecutiveSummary =
    ExecutiveSummary;

/* ============================================
Freeze Object
============================================ */

Object.freeze(
    ExecutiveSummary
);
