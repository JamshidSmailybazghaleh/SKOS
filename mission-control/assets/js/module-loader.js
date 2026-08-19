/*
====================================================
SKOS Mission Control

Runtime Module Loader

File:
module-loader.js

Version:
4.0

Status:
STABLE
====================================================
*/

const ModuleLoader = {

    loadedModules: [],

    async loadModule(moduleName) {

        alert("Loading Module : " + moduleName);
      
        console.log("================================");
        console.log("Loading Module:", moduleName);
        console.log("================================");

        try {

            const htmlLoaded = await this.loadHTML(moduleName);

            if (!htmlLoaded) {

                console.error("Module HTML failed:", moduleName);

                return false;

            }

            await this.loadScript(moduleName);

            await this.loadData(moduleName);

            // اطمینان از آماده شدن DOM
            await this.waitDOM();

            await this.initializeModule(moduleName);

            this.loadedModules.push(moduleName);

            console.log("Module Ready:", moduleName);

            return true;

        }
        catch (error) {

            console.error(error);

            return false;

        }

    },

    async loadHTML(moduleName) {

        try {

            Logger.info("Loading HTML: " + CONFIG.paths.modules + moduleName + ".html");
            const response = await fetch(

                CONFIG.paths.modules +
                moduleName +
                ".html"

            );

            if (!response.ok) {

                throw new Error(
                    "Module HTML not found."
                );

            }

            const html = await response.text();
            Logger.info("HTML Loaded: " + moduleName);

            const moduleConfig =
                await Registry.getModule(moduleName);

            if (!moduleConfig) {
                throw new Error(
                    "Module not registered: " + moduleName
                );
            }

            if (!moduleConfig.container) {
                throw new Error(
                    "Module container not defined: " + moduleName
                );
            }

            const container =
                document.getElementById(
                    moduleConfig.container
                );

            if (!container) {

                throw new Error(
                    "Dashboard container not found."
                );

            }

            container.classList.remove("loading");

            container.innerHTML = "";

            container.insertAdjacentHTML(
                "beforeend",
                html
            );

            console.log("HTML Loaded.");

            return true;

        }
        catch (error) {

            console.error(error);

            return false;

        }

    },

    async loadScript(moduleName) {

        return new Promise((resolve) => {

            const objectName =
                this.toObjectName(moduleName);

            if (window[objectName]) {

                resolve(true);

                return;

            }

            const script =
                document.createElement("script");

            script.src =
                CONFIG.paths.scripts +
                moduleName +
                ".js";

            script.onload = () => {

    alert("Script Loaded : " + moduleName);

    console.log("JavaScript Loaded.");

    resolve(true);

};

            script.onerror = () => {

                console.warn(
                    "JavaScript not found:",
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

                return;

            }

            const json =
                await response.json();

            window[
                moduleName + "Data"
            ] = json;

            console.log("JSON Loaded.");

        }
        catch {

            console.log(
                "No JSON for",
                moduleName
            );

        }

    },

    async initializeModule(moduleName) {

        const objectName =
            this.toObjectName(moduleName);

        const moduleObject =
            window[objectName];

        if (
            moduleObject &&
            typeof moduleObject.initialize === "function"
        ) {

            console.log(
                "Initializing:",
                objectName
            );

            await moduleObject.initialize();

        }
        else {

            console.warn(
                objectName +
                ".initialize() missing."
            );

        }

    },

    async waitDOM() {

        return new Promise(resolve => {

            requestAnimationFrame(() => {

                requestAnimationFrame(resolve);

            });

        });

    },

    toObjectName(moduleName) {

        return moduleName

            .split("-")

            .map(part =>

                part.charAt(0).toUpperCase() +
                part.slice(1)

            )

            .join("");

    },

    isLoaded(moduleName) {

        return this.loadedModules.includes(moduleName);

    },

    list() {

        return [...this.loadedModules];

    },

    clear() {

        this.loadedModules = [];

    }

};

Object.freeze(ModuleLoader);
