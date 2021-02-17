window.onload = () => {
    let hoy = new Date();


    let c = new Calendar(hoy.getDate(), hoy.getMonth(), hoy.getFullYear());
    //c.setFecha(10,07,2019);
    c.USCalendar = false;

    c.createCalendar();
    c.setEVListeners();

    generarMeteoData();



}


async function generarMeteoData() {



    let api_key = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdWV2YXNnYXJjaWFmcmFuY2lzY29qYXZpZXJAZ21haWwuY29tIiwianRpIjoiOTc0YWFmOWMtZGM5Ni00YmNjLTg0NGItZmQzM2U2YzZlYzA3IiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2MDMxNDgyNTIsInVzZXJJZCI6Ijk3NGFhZjljLWRjOTYtNGJjYy04NDRiLWZkMzNlNmM2ZWMwNyIsInJvbGUiOiIifQ.epoR1RC0hRH_D3vFi3WyEtDoB16riYvzXOHFDwo3mUU";
    let url = "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/11032?api_key=" + api_key;
    let result = await fetch(url, {
        cache: 'no-cache',
        mode: 'cors'
    });
    let data = await result.json();
    let dat2 = await fetch(data.datos)
    let dat4 = await dat2.json();

    let pMax = document.getElementById("SensMax");
    let pMin = document.getElementById("SensMinima");

    let sensMax = dat4[0].prediccion.dia[1].sensTermica.maxima;
    let sensMin = dat4[0].prediccion.dia[1].sensTermica.minima

    pMax.innerHTML = "Máxima de "+sensMax+"ºC";
    pMin.innerHTML = "Mínima de "+sensMin+"ºC";
 



}