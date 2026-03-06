import { useState } from "react";
import { useInventory } from "../contexts/InventoryContext";
import { useMenu } from "../contexts/MenuContext";
import { sileo } from "sileo";
import "./styles/AddIngredients.css";
export const AddIngredients = ({
  toggleModal,
  handleToggleModal,
  handlePreviousStep,
  menuData,
  setMenuData,
}) => {
  const [listItem, setListItem] = useState([]);
  const { inventory, searchStock, units } = useInventory();
  const { handleSaveMenu, handleSaveIngredients, fetchMenu, handleUpdateMenu } =
    useMenu();
  const [formData, setFormData] = useState({
    nombre: "",
    product_id: "",
    cantidad: "",
    unidad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nombre") {
      const ingredentSelect = inventory.find((item) => item.nombre === value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        product_id: ingredentSelect ? ingredentSelect.id : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const stockDisponible = formData.nombre
    ? searchStock(formData.nombre) -
      listItem
        .filter((item) => item.nombre === formData.nombre)
        .reduce((sum, item) => sum + Number(item.cantidad), 0)
    : 0;

  const handleSubmit = async () => {
    let menuId = menuData.id;

    if (menuId) {
      // Estamos editando
      const success = await handleUpdateMenu(menuId, menuData);
      if (!success) return;
    } else {
      // Estamos creando
      menuId = await handleSaveMenu(menuData);
      if (!menuId) return;
    }

    // Guardar ingredientes (limpieza previa lógica de negocio pendiente si se requiere)
    for (const item of listItem) {
      await handleSaveIngredients(item, menuId);
    }

    fetchMenu();

    if (!menuData.id) {
      setMenuData({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
      });
    }

    setListItem([]);
    handlePreviousStep();
    handleToggleModal();
  };
  const handleAddIngredients = () => {
    const qty = Number(formData.cantidad);
    if (qty > stockDisponible) {
      sileo.error("No hay suficiente stock");
      return;
    }
    setListItem([...listItem, { ...formData, cantidad: qty }]);
    sileo.success("Ingrediente agregado exitosamente");
    setFormData({
      nombre: "",
      product_id: "",
      cantidad: "",
      unidad: "",
    });
  };
  return (
    <>
      <section className="ingredients-container">
        <select
          name="nombre"
          id="ingredient"
          value={formData.nombre}
          onChange={handleChange}
        >
          <option value="" disabled>
            Seleccionar ingrediente
          </option>
          {inventory.map((item) => (
            <option key={item.id} value={item.nombre}>
              {item.nombre}
            </option>
          ))}
        </select>
        <select
          className="select-unit"
          name="unidad"
          id="unidad"
          value={formData.unidad}
          onChange={handleChange}
        >
          <option>Seleccionar unidad</option>
          {units.map((item) => (
            <option key={item.id} value={item.unit}>
              {item.unit}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="cantidad"
          min={1}
          max={stockDisponible}
          placeholder={`Stock:  ${stockDisponible}`}
          value={formData.cantidad}
          onChange={handleChange}
          required
        />
        <button
          className="add-button"
          type="button"
          onClick={handleAddIngredients}
          disabled={!formData.nombre || !formData.cantidad}
        >
          +
        </button>
      </section>
      <section className="ingredients-list">
        <ul>
          {listItem.map((item, index) => (
            <li key={index}>
              <span>{item.nombre}</span>
              <span>{item.cantidad}</span>
            </li>
          ))}
        </ul>
      </section>
      <footer className="modal-footer">
        <button type="button" onClick={handlePreviousStep}>
          <span>-</span>
        </button>
        <button type="button" onClick={() => handleSubmit()}>
          Agregar Platillo
        </button>
      </footer>
    </>
  );
};
