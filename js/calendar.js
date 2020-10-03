class Calendar {

    constructor(dia, mes, year) {

        this.dia = dia;
        this.mes = mes;
        this.year = year;
        this.cabecera = [];
        this.USCalendar = true;
        this.selectedFecha;
        this.auxFecha;
        this.ShiftDias = {
            0: 1,
            1: 2,
            2: 3,
            3: 4,
            4: 5,
            5: 6,
            6: 7
        };
        this.setdeDias = {
            0: "Lun",
            1: "Mar",
            2: "Mie",
            3: "Jue",
            4: "Vie",
            5: "Sab",
            6: "Dom"
        };
        this.setDiasUS = {
            1: "Lun",
            2: "Mar",
            3: "Mie",
            4: "Jue",
            5: "Vie",
            6: "Sab",
            0: "Dom"
        };

        this.setDeMeses = {
            0: "Enero",
            1: "Febrero",
            2: "Marzo",
            3: "Abril",
            4: "Mayo",
            5: "Junio",
            6: "Julio",
            7: "Agosto",
            8: "Septiembre",
            9: "Octubre",
            10: "Noviembre",
            11: "Diciembre"
        }

    }
    setFecha(_dia, _mes, _year) {
        this.dia = _dia;
        this.mes = _mes - 1;
        this.year = _year;
        
        console.log(this.dia, this.mes, this.year, "primero")
    }

    createCalendar() {
        //DOM
        let tabla = document.getElementById("tabla");
        let btn_year = document.getElementById("btn_Year");
        let span_mes = document.getElementById("mes");
        let tr;
        let td;
        let cnt = 1;
        let classA = false;
        //Fechas
        let fecha;
        let dInicio;
        let dFin;

        fecha = new Date(this.year, this.mes, 1);
        this.auxFecha=fecha;
        //console.log(fecha);
        let fechaFin = new Date(this.year, this.mes + 1, 0);
        dInicio = fecha.getDay();
        dFin = fechaFin.getDate();

        //Creación de la tabla.

        //Creación de la cabecera
        for (let index = 0; index < 7; index++) {
            if (index % 7 == 0) {
                tr = document.createElement("tr");
                tabla.appendChild(tr);
            }

            td = document.createElement("td");


            let textnode;
            if (!this.USCalendar) {
                textnode = document.createTextNode(this.setdeDias[index]);


            } else {
                textnode = document.createTextNode(this.setDiasUS[index]);

            }

            td.appendChild(textnode);
            td.setAttribute("class","nombreMes")
            tr.appendChild(td);
        }



        //Creación de días
        for (let ind = 0; ind < 35; ind++) {
            //Si ya ha pintado una semana, crea el siguiente TR.
            if (ind % 7 == 0) {
                tr = document.createElement("tr");
          /*      if(ind % 2 != 0){
                    tr.setAttribute("class","WeekType1");
                } else {
                    tr.setAttribute("class","WeekType2");

                }*/
                tabla.appendChild(tr);
            }

            td = document.createElement("td");

            // Añadir las clases
            if (ind % 7 == 5 || ind % 7 == 6 && ind > 0) {
                td.setAttribute("class", "fiesta");
            } else {

                if(ind % 2 == 0  ){
                    
                    td.setAttribute("class"," dia WeekType1");
                } else {
                    td.setAttribute("class","dia WeekType2");

                }
               
            }

            
            

            //Añadir listener
            td.addEventListener("click", (ev) => {

                if (ev.path[0].getAttribute("class") != "vacio") {

                    let pSelect = document.getElementById("pSelect");
                    pSelect.innerHTML = ev.path[0].innerHTML + "/" + (this.mes + 1) + "/" + this.year;
                    this.selectedFecha = new Date(this.year, this.mes, ev.path[0].innerHTML);
                    console.log(this.selectedFecha);

                }

            })


            if (ind > dInicio - 2 && ind < dFin + dInicio - 1) {
                
                if (cnt == this.dia) {
                    console.log("Dia=> " + this.dia +"\n ind =>" + ind);
                    td.setAttribute("id","hoy");
                    td.setAttribute("class", "hoy");
                }
                let textnode = document.createTextNode(cnt);
                td.appendChild(textnode);
                cnt++;

            } else {

                td.setAttribute("class", "vacio");

            }

            tr.appendChild(td);

        }

        //Poner día a btn año y mes al mes
        btn_year.innerHTML = this.year;
        span_mes.innerHTML = this.setDeMeses[this.mes];
    }

    setCabecera(vbuttonalores) {
button
        this.cabebuttoncera = valores;

    }

    setEVListeners() {
        //Listener de botones
        let btn_decadaAnterior = document.getElementById("decadaAnterior");
        let btn_decadaSiguiente = document.getElementById("decadaSiguiente");
        let btn_yearAnterior = document.getElementById("_yearAnterior");
        let btn_yearSiguiente = document.getElementById("_yearSiguiente");
        let btn_mesAnterior = document.getElementById("mesAnterior");
        let btn_mesSiguiente = document.getElementById("mesSiguiente");
      
        btn_decadaAnterior.addEventListener("click", (ev) => {

      
            let currentY = this.year;
            this.year -= 10;
            clearCalendar();
            this.createCalendar();
            let hoy = document.getElementById("hoy");
            hoy.classList.remove("hoy");
            hoy.setAttribute("class","dia");  

        })

        btn_decadaSiguiente.addEventListener("click", (ev) => {
          
            this.year += 10;
            clearCalendar();
            this.createCalendar();
            let hoy = document.getElementById("hoy");
            hoy.classList.remove("hoy");
            hoy.setAttribute("class","dia");  

        })

        btn_yearAnterior.addEventListener("click", (ev) => {
        
            this.year -= 1;
            clearCalendar();
            this.createCalendar();
            let hoy = document.getElementById("hoy");
            hoy.classList.remove("hoy");
            hoy.setAttribute("class","dia");  

        })

        btn_yearSiguiente.addEventListener("click", (ev) => {
         
            this.year += 1;
            clearCalendar();
            this.createCalendar();
            let hoy = document.getElementById("hoy");
            hoy.classList.remove("hoy");
            hoy.setAttribute("class","dia");  

        })


        btn_mesAnterior.addEventListener("click", (ev) => {
        
            if (this.mes == 0) {

                this.mes = 11;
                this.year -= 1;

            } else {

                this.mes -= 1;

            }

            clearCalendar();
            this.createCalendar();
            let hoy = document.getElementById("hoy");
            hoy.classList.remove("hoy");
            hoy.setAttribute("class","dia");  
        })

        btn_mesSiguiente.addEventListener("click", (ev) => {
           
            if (this.mes == 11) {

                this.mes = 0;
                this.year += 1;

            } else {

                this.mes += 1;
            }

            clearCalendar();
            this.createCalendar();
            let hoy = document.getElementById("hoy");
            hoy.classList.remove("hoy");
            hoy.setAttribute("class","dia");  
        })



     

    }


    toggleControles() {
        // Cambia la visibilidad de los controles, los esconde tanto como los pinta
        let botonera = document.getElementById("botonera");
        botonera.classList.toggle("invisible");

    }

    getSelectedFecha() {
        return this.selectedFecha;
    }
}

function clearCalendar() {

    //Limpia el calendario
    let calendario = document.getElementById("tabla");
    calendario.innerHTML = "";
}



Date.prototype.getWeek = function() {
    let date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    let week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
  }