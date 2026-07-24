/*
====================================================
SKOS Mission Control

Module Loader

File:
module-loader.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const ModuleLoader = {

    loadedModules: [],

    async load(moduleName, containerId) {

        try {

            console.log(
                "Loading Module:",
                moduleName
            );

            const response =
                await fetch(
                    CONFIG.paths.modules +
                    moduleName +
                    ".html"
                );

            if (!response.ok) {

                throw new Error(
                    "Module not found: " +
                    moduleName
                );

            }

            const html =
                await response.text();

            const container =
                document.getElementById(
                    containerId
                );

            if (!container) {

                throw new Error(
                    "Container not found: " +
                    containerId
                );

            }

            container.innerHTML = html;

            this.loadedModules.push(moduleName);

            console.log(
                "Module Loaded:",
                moduleName
            );

            return true;

        }

        catch (error) {

            console.error(
                error
            );

            return false;

        }

    },



    isLoaded(moduleName) {

        return this.loadedModules.includes(
            moduleName
        );

    },



    list() {

        return this.loadedModules;

    },



    clear() {

        this.loadedModules = [];

    }

};


Object.freeze(ModuleLoader);
