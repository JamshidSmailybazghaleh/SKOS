/**
 * ==========================================================
 * SKOS Module Registry
 * ==========================================================
 */


class ModuleRegistry {



    constructor(){


        this.modules =

            new Map();



        this.dependencies =

            new Map();



    }








    /**
     * Register Module
     */


    register(

        module

    ){



        if(

            !module.name

        ){


            throw new Error(

                "Module name required."

            );


        }



        if(

            this.modules.has(

                module.name

            )

        ){


            throw new Error(

                "Module already registered."

            );


        }



        this.modules.set(

            module.name,

            module

        );



        return module;


    }








    /**
     * Remove Module
     */


    unregister(

        name

    ){



        return this.modules.delete(

            name

        );


    }








    /**
     * Get Module
     */


    get(

        name

    ){



        return (

            this.modules.get(

                name

            )

            ||

            null

        );


    }








    /**
     * Initialize all modules
     */


    initializeAll(){



        for(

            const module

            of

            this.modules.values()

        ){


            module.initialize();


        }



        return true;


    }








    /**
     * Shutdown all modules
     */


    shutdownAll(){



        for(

            const module

            of

            this.modules.values()

        ){


            module.shutdown();


        }



        return true;


    }








    /**
     * Dependency registration
     */


    addDependency(

        module,

        dependency

    ){



        if(

            !this.dependencies.has(

                module

            )

        ){


            this.dependencies.set(

                module,

                []

            );


        }



        this.dependencies

            .get(module)

            .push(

                dependency

            );



    }








    /**
     * List modules
     */


    list(){



        return Array.from(

            this.modules.values()

        )

        .map(

            module =>

                module.getStatus()

        );


    }








    /**
     * Registry report
     */


    report(){



        return {



            count:

                this.modules.size,



            modules:

                this.list()



        };


    }



}



module.exports = ModuleRegistry;
