/**
 * ==========================================================
 * SKOS Module Contract
 * ==========================================================
 */


class SKOSModule {



    constructor(

        options = {}

    ){


        this.name =

            options.name ||

            "Unnamed Module";



        this.version =

            options.version ||

            "1.0.0";



        this.status =

            "CREATED";



    }








    initialize(){


        this.status =

            "INITIALIZED";


        return true;


    }








    execute(

        context = {}

    ){


        throw new Error(

            "Execute method must be implemented."

        );


    }








    shutdown(){


        this.status =

            "SHUTDOWN";


        return true;


    }








    getStatus(){


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status



        };


    }


}


module.exports = SKOSModule;
