window.onload = ()=>{
   let hoy = new Date();
   // console.log(hoy.getMonth());
    let c = new Calendar(hoy.getDate(),hoy.getMonth(),hoy.getFullYear());
   // let c = new Calendar(1,10,2019);    
    c.createCalendar();

}

