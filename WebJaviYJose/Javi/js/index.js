let isMuted = false;

window.onload = () => {
    const musica = document.getElementById("demo");

    let muted = true;
    const btn_mute = document.getElementById("mute");
    const icono = document.getElementById("iconoSonido");


    btn_mute.addEventListener("click", (e) => {


        if (muted) {
            icono.src = "Javi/img/unmute.webp"
            musica.play();

            muted = false;
        } else {
            icono.src = "Javi/img/mute.svg"
            musica.pause();

            muted = true;

        }



    })



}