/**
 * History Manager
 *
 * ENG-SDKC-005
 * BUILD-000001
 */


const fs = require("fs");
const path = require("path");


class HistoryManager {


    constructor(repositoryManager) {


        this.repository =
            repositoryManager;


    }



    getHistoryPath(objectId){


        return path.join(

            this.repository.objectPath(objectId),

            "history.log"

        );


    }



    createHistory(objectId){


        this.repository
        .createObjectRepository(objectId);



        const file =
            this.getHistoryPath(objectId);



        if(
            !fs.existsSync(file)
        ){

            fs.writeFileSync(
                file,
                "",
                "utf8"
            );

        }


        return file;


    }




    addEvent(
        objectId,
        event,
        details = {}
    ){


        const historyFile =
            this.createHistory(objectId);



        const record = {


            timestamp:
            new Date()
            .toISOString(),


            event,


            details


        };



        fs.appendFileSync(

            historyFile,

            JSON.stringify(record)
            + "\n",

            "utf8"

        );



        return record;


    }





    getHistory(objectId){


        const file =
            this.getHistoryPath(objectId);



        if(
            !fs.existsSync(file)
        ){

            return [];

        }



        return fs.readFileSync(

            file,

            "utf8"

        )
        .split("\n")
        .filter(Boolean)
        .map(
            line =>
            JSON.parse(line)
        );


    }





    clearHistory(objectId){


        const file =
            this.getHistoryPath(objectId);



        if(
            fs.existsSync(file)
        ){

            fs.writeFileSync(
                file,
                "",
                "utf8"
            );

            return true;

        }


        return false;


    }


}


module.exports = HistoryManager;
