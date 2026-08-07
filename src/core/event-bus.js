/**
 * ==========================================================
 * SKOS Event Bus
 * ==========================================================
 */


class EventBus {



    constructor(){


        this.listeners = {};

    }







    on(

        event,

        handler

    ){



        if(

            !this.listeners[event]

        ){


            this.listeners[event] = [];


        }



        this.listeners[event].push(

            handler

        );


    }







    emit(

        event,

        payload = {}

    ){



        const handlers =

            this.listeners[event] || [];



        handlers.forEach(

            handler =>

                handler(payload)

        );



    }







    remove(

        event

    ){



        delete this.listeners[event];


    }







    clear(){


        this.listeners = {};


    }


}



module.exports = EventBus;
