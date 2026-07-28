/*
====================================================
SKOS Mission Control

Boot Sequence Engine

File:
boot-sequence.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const BootSequence = {

    steps: [

        {
            name: "Logger",
            action: async () => {

                RuntimeState.set(
                    "logger",
                    "READY"
                );

                return true;

            }

        },

        {
            name: "Registry",
            action: async () => {

                return await KernelAPI.Registry.Load();

            }

        },

        {
            name: "Event Bus",
            action: async () => {

                RuntimeState.set(
                    "eventBus",
                    "READY"
                );

                return true;

            }

        },

        {
            name: "Command Engine",
            action: async () => {

                RuntimeState.set(
                    "commandEngine",
                    "READY"
                );

                return true;

            }

        },

        {
            name: "Modules",
            action: async () => {

                return await SKOS.loadModules();

            }

        },

        {
            name: "Status",
            action: async () => {

                return await SKOS.loadStatus();

            }

        },

        {
            name: "Dashboard",
            action: async () => {

                SKOS.renderDashboard();

                return true;

            }

        }

    ],

    async start() {

        Logger.info(
            "Boot Sequence Started"
        );

        RuntimeState.set(
            "system",
            "INITIALIZING"
        );

        for (const step of this.steps) {

            Logger.info(
                "Starting: " + step.name
            );

            try {

                const ok = await step.action();

                if (ok === false) {

                    throw new Error(
                        step.name + " failed."
                    );

                }

                Logger.info(
                    step.name + " Ready"
                );

            }

            catch (error) {

                RuntimeState.set(
                    "system",
                    "FAILED"
                );

                Logger.error(
                    error.message
                );

                return false;

            }

        }

        RuntimeState.set(
            "system",
            "OPERATIONAL"
        );

        Logger.info(
            "Boot Sequence Finished"
        );

        return true;

    }

};

window.BootSequence = BootSequence;

Object.freeze(BootSequence);
