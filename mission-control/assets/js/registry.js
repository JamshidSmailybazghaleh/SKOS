/*
====================================================
SKOS Mission Control

Registry Engine

File:
registry.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const Registry = {

    data: null,



    async load() {

        try {

            console.log(
                "Loading Registry..."
            );

            const response = await fetch(

                CONFIG.paths.data +

                "registry.json"

            );

            if (!response.ok) {

                throw new Error(
                    "registry.json not found."
                );

            }

            this.data = await response.json();

            console.log(
                "Registry Loaded."
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



    async getModules() {

        if (this.data === null) {

            const ok = await this.load();

            if (!ok) {

                return [];

            }

        }

        return this.data.modules.filter(

            module => module.enabled === true

        );

    },



    async getModule(moduleName) {

        if (this.data === null) {

            const ok = await this.load();

            if (!ok) {

                return null;

            }

        }

        return this.data.modules.find(

            module => module.name === moduleName

        );

    },



    async reload() {

        this.data = null;

        return await this.load();

    },



    getStatus() {

        if (!this.data) {

            return "NOT LOADED";

        }

        return this.data.status;

    },



    getVersion() {

        if (!this.data) {

            return "";

        }

        return this.data.version;

    }

};


Object.freeze(Registry);
