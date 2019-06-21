import React, { useState, useEffect, Fragment } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

const App = () => {
  //Use state retorna 2 fuciones el get y el set
  //const [citas, guardarCita] = useState([]);

  //cargar citas desde el localstorage como state inical
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));

  if (!citasIniciales) {
    citasIniciales = [];
  }
  const [citas, guardarCita] = useState(citasIniciales);

  //Funcion para agregar nuevas citas al state
  const crearCita = cita => {
    //tomar copia del state
    const nuevasCitas = [...citas, cita];

    //console.log(nuevasCitas);
    guardarCita(nuevasCitas);
  };

  //Elimina las Citas del state
  const eliminarCita = index => {
    const nuevasCitas = [...citas];

    //Splice es que lugar quieres eliminar y cuantos elementos despues de ese index
    nuevasCitas.splice(index, 1);

    guardarCita(nuevasCitas);
  };

  //Guardado de citas en el local storage
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem("citas"));

    if (citasIniciales) {
      //para ver si existe o si tiene datos adentro
      localStorage.setItem("citas", JSON.stringify(citas)); //tomara el state y lo pondra e en local storage
    } else {
      localStorage.setItem("citas", JSON.stringify([])); //primera vez creara un arreglo vacio despues de ello ya pasa al primro
    }
  }, [citas]);

  //Object keys toma las posicciones o llaves de el arreglo apra ver si esta vacio o cuanto tiene sus posciciones
  const titulo =
    Object.keys(citas).length === 0
      ? "No hay Citas"
      : "Administrar las citas aqui";

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita, index) => (
              <Cita
                key={index}
                index={index}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;

//one-half column*2 en skeleton crea 2 divs tipo row
