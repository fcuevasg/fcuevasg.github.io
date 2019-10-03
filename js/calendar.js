class Calendar {

    constructor(dia, mes, year) {

        this.dia = dia;
        this.mes = mes-1;
        this.year = year;
        this.cabecera = [];
    }



    createCalendar(d = this.dia, m = this.mes, y = this.year) {
        let tabla = document.getElementById("tabla");
        let cnt = 1;
        let fecha;
        let dInicio;
        let dFin;
        let tr;
        let td;
        fecha = new Date(y, m,d);

        dInicio = fecha.getDay();
        dFin = new Date(y, m + 1, 0).getDate();
        for (let ind = 0; ind < 35; ind++) {
         
             td = document.createElement("td"); // Create a <li> node

            if (ind > dInicio-2 && ind < dFin+1) {
                let textnode = document.createTextNode(cnt); // Create a text node
                console.log(textnode)
                td.appendChild(textnode);
                cnt++;
            }


            
            if(ind % 7 == 0){
            
                tr = document.createElement("tr");

           }
           tr.appendChild(td);
           tabla.appendChild(tr);


        }


        console.log(fecha, dInicio, dFin);
    }


    setCabecera(valores) {
        this.cabecera = valores;

    }

}