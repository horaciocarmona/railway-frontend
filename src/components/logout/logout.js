import { useRef } from "react"
import { useState } from "react"
import { getCookieValue} from "../../context/cartContext"
const token = getCookieValue('token');

//import {useCookies} from "react"
export const Logout = () => {
    const [mensaje, setMensaje] = useState('')
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form
    const consultarForm = (e) => {
        //Consultar los datos del formulario
        e.preventDefault()
//        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
//        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
//        const token = document.cookie.slice(6)
        let urlConection=""
        if ((process.env.REACT_APP_BACKEND_URL) && (process.env.REACT_APP_BACKEND_URL.length) > 0
        ) {
            urlConection=process.env.REACT_APP_BACKEND_URL+'/api/sessions/logout'
        } else {
            urlConection='http://localhost:8080/api/sessions/logout'

        }

        fetch(urlConection, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({token:token})
        })
        .then(response => response.json())
        .then(data => {
           // duracion de 1 dia
//           document.cookie = `token=${data.token};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`
            console.log('respuesta',data)
           if (data){
                document.cookie = `token=${''};expires=${new Date(Date.now(0)).toUTCString()};path=/`
                setMensaje("Se deslogeo correctamente")
           }
   })
   .catch(error => setMensaje(`Error en ingreso ${error}`))
//   console.log(token)
   e.target.reset() //Reset form

    }

    return (
        <div className="container divForm" >
            <h3>Formulario de deslogeo</h3>
            <form onSubmit={consultarForm} ref={datForm}>
                <button type="submit" className="btn btn-primary">Cerrar Sesion</button>
            </form>
            <p>----------------------------------------------</p>    
            <p>Mensaje de respuesta: {mensaje}</p>

        </div>
    )
}