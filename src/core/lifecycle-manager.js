/**
 * ==========================================================
 * SKOS Lifecycle Manager
 * ==========================================================
 */


class LifecycleManager {



    constructor(){


        this.state =

            "CREATED";


    }







    initialize(){


        this.state =

            "INITIALIZED";


        return true;


    }







    start(){


        this.state =

            "RUNNING";


        return true;


    }







    stop(){


        this.state =

            "STOPPED";


        return true;


    }







    shutdown(){


        this.state =

            "SHUTDOWN";


        return true;


    }







    getState(){


        return this.state;


    }


}



module.exports = LifecycleManager;
