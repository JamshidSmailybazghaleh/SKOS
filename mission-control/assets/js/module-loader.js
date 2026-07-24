/*
====================================================
SKOS Mission Control

Module Loader

Version:
2.0

Status:
ACTIVE
====================================================
*/

const ModuleLoader = {

    loadedModules: [],

    async loadModule(moduleName) {

        console.log(
            "Loading Module:",
            moduleName
        );

        const htmlLoaded =
            await this.loadHTML(moduleName);

        if (!htmlLoaded) {

            return false;

        }

        await this.loadScript(moduleName);

        await this.loadData(moduleName);

        this.loadedModules.push(moduleName);

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

                throw new Error();

            }

            const html =
                await response.text();

            document.getElementById(

                CONFIG.dashboard.containerId

            ).innerHTML = html;

            return true;

        }

        catch {

            console.error(

                "HTML not found:",

                moduleName

            );

            return false;

        }

    },



    async loadScript(moduleName) {

        return new Promise(

            (resolve)=>{

                const script =
                    document.createElement(
                        "script"
                    );

                script.src =

                    CONFIG.paths.scripts +

                    moduleName +

                    ".js";

                script.onload =
                    ()=>resolve(true);

                script.onerror =
                    ()=>resolve(false);

                document.body.appendChild(
                    script
                );

            }

        );

    },



    async loadData(moduleName) {

        try {

            const response =
                await fetch(

                    CONFIG.paths.data +

                    moduleName +

                    ".json"

                );

            if (!response.ok) {

                return;

            }

            const json =
                await response.json();

            window[moduleName+"Data"] =
                json;

        }

        catch{

            console.warn(

                "JSON not found:",

                moduleName

            );

        }

    },



    isLoaded(moduleName){

        return this.loadedModules.includes(
            moduleName
        );

    },



    list(){

        return this.loadedModules;

    }

};


Object.freeze(ModuleLoader);
