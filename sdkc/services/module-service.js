/*
====================================================
SKOS Mission Control

Module Service

File:
module-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/


const ModuleService = {


    modules: [],


    registryPath:

        "data/registry.json",



    async initialize() {


        Logger.info(

            "Module Service Initializing..."

        );


        await this.loadRegistry();


        return true;

    },



    async loadRegistry() {


        try {


            const response = await fetch(

                this.registryPath

            );


            if (!response.ok) {


                throw new Error(

                    "Module Registry Not Found."

                );


            }


            const registry =

                await response.json();



            this.modules =

                registry.modules || [];



            Logger.info(

                "Modules Loaded: " +

                this.modules.length

            );


            return true;


        }


        catch(error) {


            Logger.error(

                error.message

            );


            this.modules = [];


            return false;


        }

    },



    register(module) {


        if (!module || !module.id) {


            return false;


        }



        const exists =

            this.modules.some(

                item =>

                item.id === module.id

            );



        if (exists) {


            return false;


        }



        this.modules.push(module);



        return true;


    },



    getModules() {


        return this.modules;


    },



    getModule(id) {


        return this.modules.find(

            module =>

            module.id === id

        ) || null;


    },



    enable(id) {


        const module =

            this.getModule(id);



        if (!module) {


            return false;


        }



        module.enabled = true;



        this.emitStatus(

            module,

            "ENABLED"

        );



        return true;


    },



    disable(id) {


        const module =

            this.getModule(id);



        if (!module) {


            return false;


        }



        module.enabled = false;



        this.emitStatus(

            module,

            "DISABLED"

        );



        return true;


    },



    isEnabled(id) {


        const module =

            this.getModule(id);



        return module

            ? module.enabled

            : false;


    },



    emitStatus(
        module,
        status
    ) {


        if (window.EventBus) {


            EventBus.publish(

                "module.status.changed",

                {

                    id:

                        module.id,


                    name:

                        module.name,


                    status:

                        status

                }

            );


        }


    },



    statistics() {


        return {


            total:

                this.modules.length,


            enabled:

                this.modules.filter(

                    item =>

                    item.enabled

                ).length


        };


    },



    status() {


        return "READY";


    }


};



window.ModuleService =

    ModuleService;



Object.freeze(

    ModuleService

);
