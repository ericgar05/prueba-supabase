import "./styles/NominaPage.css";
import "../src/components/styles/cardempleados.css";
import "../src/index.css";
import supabase from "../src/api/supaBase.js";

import { CardContainer } from "../src/components/CardContainer";
import { useState, useEffect } from "react";
import { Modal } from "../src/components/Modal.jsx";
import { BackButton } from "../src/components/BackButton.jsx";

const initialFormState = {
  name: "",
  hire_date: "",
  role: "",
  salary: "",
  email: "",
  turn: "Mañana",
  type: "Tiempo completo",
};

export const NominaPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  const getEmpleados = async () => {
    const { data, error } = await supabase.from("employes").select("*");
    if (error) {
      console.error("Error cargando empleados:", error);
      return;
    }
    setEmpleados(data);
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  const handleSubmitEmploye = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      salary: formData.salary ? parseFloat(formData.salary) : 0,
    };

    const { error } = await supabase.from("employes").insert([dataToSubmit]);

    if (error) {
      alert("Error al agregar empleado: " + error.message);
    } else {
      alert("Empleado agregado con éxito");
      setIsModalOpen(false);
      getEmpleados();
      setFormData(initialFormState);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const editEmploye = async (id) => {
    const { data, error } = await supabase
      .from("employes")
      .update(formData)
      .eq("id", id);
    if (error) {
      console.error("Error editando empleado:", error);
      return;
    }
    getEmpleados();
    setIsModalOpen(false);
    setFormData(initialFormState);
  };

  const { name, hire_date, role, salary, email, turn, type } = formData;

  return (
    <div className="nomina-page">
      <BackButton />
      <h1>Nomina &amp; Personal</h1>
      <CardContainer empleados={empleados} onUpdate={getEmpleados} />

      <div className="container__btn">
        <button className="btn__add" onClick={() => setIsModalOpen(true)}>
          Agregar Empleado
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Añadir Nuevo Empleado"
      >
        <form className="Modal__form" onSubmit={handleSubmitEmploye}>
          <div className="Inputs">
            <label>Nombre completo:</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              placeholder="Luis Alfons Sawamura"
              onChange={handleChange}
              required
            />
          </div>

          <div className="Inputs">
            <label>Fecha de contratación:</label>
            <input
              name="hire_date"
              type="date"
              value={formData.hire_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="Inputs">
            <label>Puesto:</label>
            <input
              name="role"
              type="text"
              value={formData.role}
              placeholder="Chef"
              onChange={handleChange}
              required
            />
          </div>

          <div className="Inputs">
            <label>Salario:</label>
            <input
              name="salary"
              type="number"
              value={formData.salary}
              placeholder="1000000"
              onChange={handleChange}
              required
            />
          </div>
          <div className="Inputs">
            <label>Correo electrónico:</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              placeholder="luisalfons@gmail.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="Input__row">
            <div className="Inputs">
              <label>Turno:</label>
              <select name="turn" value={turn} onChange={handleChange}>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
                <option value="Día completo">Día completo</option>
              </select>
            </div>

            <div className="Inputs">
              <label>Tipo:</label>
              <select name="type" value={type} onChange={handleChange}>
                <option value="Tiempo completo">Tiempo completo</option>
                <option value="Medio tiempo">Medio tiempo</option>
                <option value="Por contrato">Por contrato</option>
              </select>
            </div>
          </div>

          <button type="submit" className="Card__btn Btn__save">
            Guardar Empleado
          </button>
        </form>
      </Modal>
    </div>
  );
};
