window.onload = () => {
    let hoy = new Date();

    let c = new Calendar(hoy.getDate(), hoy.getMonth(), hoy.getFullYear());
    //c.setFecha(10,07,2019);
    c.USCalendar = false;

    c.createCalendar();
    c.setEVListeners();



}