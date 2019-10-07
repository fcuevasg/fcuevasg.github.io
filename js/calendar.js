class Calendar {

    constructor(dia, mes, year) {

        this.dia = dia;
        this.mes = mes;
        this.year = year;
        this.cabecera = [];
        this.USCalendar=true;
        this.ShiftDias = {0:1,1:2,2:3,3:4,4:5,5:6,6:7};
        this.setdeDias = {0:"Lun",1:"Mar",2:"Mie",3:"Jue",4:"Vie",5:"Sab",6:"Dom"};
        this.setDiasUS = {1:"Lun",2:"Mar",3:"Mie",4:"Jue",5:"Vie",6:"Sab",0:"Dom"};
        
    }

    setFecha(_dia,_mes,_year){
        this.dia=_dia;
        this.mes=_mes-1;
        this.year=_year;
        console.log(this.dia,this.mes,this.year,"primero")
        
    }

    createCalendar() {
        //DOM
       
        
        let tabla = document.getElementById("tabla");
        let tr;
        let td;
        let cnt = 1;
        //Fechas
        let fecha;
        let dInicio;
        let dFin;
        
        fecha = new Date(this.year, this.mes,1);
        console.log(fecha);
        let fechaFin = new Date(this.year, this.mes+1,0);
        dInicio = fecha.getDay();
        dFin = fechaFin.getDate();
        let sobrante = calcularSobrante(dInicio,fechaFin);
        //Creación de la tabla.

            //Creación de la cabecera
        for (let index = 0; index < 7; index++) {
            if(index % 7 == 0){
                tr = document.createElement("tr");
                tabla.appendChild(tr);
            }
            td = document.createElement("td"); 
            let textnode;
            if(!this.USCalendar){
             textnode = document.createTextNode(this.setdeDias[index]);
              
              
            } else  {
             textnode = document.createTextNode(this.setDiasUS[index]);

            }
            td.appendChild(textnode);
            tr.appendChild(td);
        }



            //Creación de días
        for (let ind = 0; ind < 40; ind++) {
            //Si ya ha pintado una semana, crea el siguiente TR.
    
        
            if(ind % 7 == 0){
                tr = document.createElement("tr");
                tabla.appendChild(tr);
            }


             td = document.createElement("td"); 

            if (ind > dInicio-2 && ind < dFin+dInicio-1) {
                let textnode = document.createTextNode(cnt); 
                console.log("pintando TD",cnt,ind)
                td.appendChild(textnode);
                cnt++;
            } 
           tr.appendChild(td);
           
        }


       // console.log(fecha, dInicio, dFin);
    }


    setCabecera(valores) {
        this.cabecera = valores;

    }


   

}
function calcularSobrante(dInicio,dFin){
    return (7-dInicio)+(7-dFin.getDate());

}