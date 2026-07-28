/*
====================================================
SKOS Mission Control

Command Engine

File:
command-engine.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const CommandEngine = {

    history: [],

    async execute(command) {

        Logger.info(
            "Executing Command: " +
            command.action
        );

        command.timestamp =
            new Date().toISOString();

        command.status =
            "RUNNING";

        try {

            const result =
                await this.dispatch(command);

            command.status =
                "SUCCESS";

            command.result =
                result;

            this.history.push(command);

            if (window.EventBus) {

                EventBus.publish(

                    "command.executed",

                    command

                );

            }

            return result;

        }

        catch (error) {

            command.status =
                "FAILED";

            command.result =
                error.message;

            this.history.push(command);

            Logger.error(
                error.message
            );

            if (window.EventBus) {

                EventBus.publish(

                    "command.failed",

                    command

                );

            }

            return false;

        }

    },

    async dispatch(command) {

        switch(command.action) {

            case "LOAD_MODULE":

                return await KernelAPI.Module.Load(

                    command.payload.name

                );

            case "LOAD_REGISTRY":

                return await KernelAPI.Registry.Load();

            case "SYSTEM_STATUS":

                return RuntimeState.getAll();

            default:

                throw new Error(

                    "Unknown Command: " +

                    command.action

                );

        }

    },

    getHistory() {

        return this.history;

    },

    clearHistory() {

        this.history = [];

    }

};

window.CommandEngine = CommandEngine;

Object.freeze(CommandEngine);
