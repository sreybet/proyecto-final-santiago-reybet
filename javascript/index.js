const grillaTurnos = document.querySelector("div#grilla")

const retornoTabla = (turnos) => {
    return `<div class="row align-items-start filaTurnos">
                <div class="col">
                   <p class="colDias"> ${turnos.dia} </p>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-primary btn-outline-light reserva" id="${turnos.codigo}">${turnos.horario}. Reservar</button>
                </div>
            </div>    
            `
}
const retornoMsjTurnos = () => {
    return `<div class="row align-items-start filaTurnos"><p>Por el momento no tenemos turnos disponbiles.<br>Disculpe las molestias.<p></div>
    `
}

const cargarTurnos = (turnos) => {
    grillaTurnos.innerHTML = ""
    turnos.forEach((turnos)=>{grillaTurnos.innerHTML += retornoTabla(turnos)})
    reservarTurno()   
}


const buscarEnter = document.querySelector("input.cajaFiltro#filtrarEnter")
const buscarClick = document.querySelector("input.botonFiltro#filtrarClick")

const filtrarTurnos = () =>{
    let resultado = turnos.filter((turno) => turno.dia.toLowerCase().includes(buscarEnter.value.trim()))
    resultado.length > 0 && cargarTurnos(resultado)       
}

buscarEnter.addEventListener("search" , filtrarTurnos)
buscarClick.addEventListener("click" , filtrarTurnos)

const reservarTurno = () =>{
    const botonesReserva = document.querySelectorAll("button.btn.btn-primary.btn-outline-light.reserva")
    for (let botonReserva of botonesReserva){
        botonReserva.addEventListener("click", ()=>{
            let resultadoReserva = turnos.find((turno)=> turno.codigo === parseInt(botonReserva.id))
            reservas.push(resultadoReserva)
            botonReserva.setAttribute("disabled", "true")
            guardarReserva()
            mensajeAgregado()
        })}
}
  
const verMiReserva = document.querySelector("button.verMiReserva#verMiReserva")

verMiReserva.addEventListener("click", ()=> {location.href = 'reservas.html'})

const obtenerTurnos = () => {
    fetch(URL)
    .then((response)=> response.json())
    .then((data)=> turnos.push(...data))
    .then(()=>cargarTurnos(turnos))
    .catch((error)=> grillaTurnos.innerHTML += retornoMsjTurnos())
    
}
obtenerTurnos()
