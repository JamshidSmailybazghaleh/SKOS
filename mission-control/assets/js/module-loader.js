/*
====================================================
SKOS Mission Control

Module Loader

File:
module-loader.js

Version:
3.0

Status:
ACTIVE
====================================================
*/

const ModuleLoader = {

    loadedModules: [],



    async loadModule(moduleName) {

        console.log(
            "================================"
        );

        console.log(
            "Loading Module:",
            moduleName
        );

        console.log(
            "================================"
        );



        const htmlLoaded =
            await this.loadHTML(
                moduleName
            );

        if (!htmlLoaded) {

            console.error(
                "Module loading aborted."
            );

            return false;

        }



        await this.loadScript(
            moduleName
        );



        await this.loadData(
            moduleName
        );



        this.initializeModule(
            moduleName
        );



        this.loadedModules.push(
            moduleName
        );



        console.log(
            "Module Ready:",
            moduleName
        );



        return true;

    },



    async loadHTML(moduleName) {

        try {

            const response =
                await fetch(

                    CONFIG.paths.modules +

                    moduleName +

                    ".html"

                );



            if (!response.ok) {

                throw new Error(
                    "HTML file not found."
                );

            }



            const html =
                await response.text();



            const container =
                document.getElementById(

                    CONFIG.dashboard.containerId

                );



            if (!container) {

                throw new Error(
                    "Dashboard container not found."
                );

            }



            container.innerHTML =
                html;



            console.log(
                "HTML Loaded."
            );



            return true;

        }

        catch(error){

            console.error(
                error
            );

            return false;

        }

    },

       async loadScript(moduleName) {

        return new Promise((resolve) => {

            const script = document.createElement("script");

            script.src =
                CONFIG.paths.scripts +
                moduleName +
                ".js";

            script.onload = () => {

                console.log(
                    "JavaScript Loaded."
                );

                resolve(true);

            };

            script.onerror = () => {

                console.warn(
                    "JavaScript file not found:",
                    moduleName
                );

                resolve(false);

            };

            document.body.appendChild(script);

        });

    },



    async loadData(moduleName) {

        try {

            const response = await fetch(

                CONFIG.paths.data +
                moduleName +
                ".json"

            );

            if (!response.ok) {

                console.warn(
                    "JSON file not found:",
                    moduleName
                );

                return;

            }

            const json = await response.json();

            window[moduleName + "Data"] = json;

            console.log(
                "JSON Loaded."
            );

        }

        catch (error) {

            console.warn(error);

        }

    },



    initializeModule(moduleName) {

        const objectName =
            this.toObjectName(moduleName);

        if (

            window[objectName] &&

            typeof window[objectName].initialize === "function"

        ) {

            window[objectName].initialize();

            console.log(
                objectName +
                " initialized."
            );

        }

        else {

            console.warn(
                objectName +
                ".initialize() not found."
            );

        }

    },



    toObjectName(moduleName) {

        return moduleName

            .split("-")

            .map(

                part =>

                part.charAt(0).toUpperCase() +

                part.slice(1)

            )

            .join("");

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
