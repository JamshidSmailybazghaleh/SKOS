/**
 * ==========================================================
 * SKOS Diagnostics
 * ==========================================================
 */


class Diagnostics {



    constructor(){


        this.metrics = {};

    }







    increment(

        key

    ){



        if(

            !this.metrics[key]

        ){


            this.metrics[key] = 0;


        }



        this.metrics[key]++;


    }







    set(

        key,

        value

    ){


        this.metrics[key] = value;


    }







    report(){


        return {


            metrics:

                this.metrics,


            timestamp:

                new Date()


        };


    }


}



module.exports = Diagnostics;
