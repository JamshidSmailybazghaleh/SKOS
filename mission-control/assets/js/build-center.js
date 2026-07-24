/*
=========================================
Build Center
=========================================
*/

const BuildCenter = {

    data:null,



    async initialize(){

        await this.load();

        this.render();

    },



    async load(){

        this.data=

            window["build-centerData"];

        if(!this.data){

            const response=

                await fetch(

                    CONFIG.paths.data+

                    "build-index.json"

                );

            this.data=

                await response.json();

        }

    },



    render(){

        const table=

            document.getElementById(

                "buildTable"

            );



        table.innerHTML="";



        this.data.builds.forEach(

            build=>{

                table.innerHTML+=`

<tr>

<td>${build.id}</td>

<td>${build.title}</td>

<td>${build.status}</td>

<td>${build.date}</td>

</tr>

`;

            }

        );

    }

};

Object.freeze(BuildCenter);
