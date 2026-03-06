import { useState } from "react";
import "./styles/CardMenu.css";
import { EditIcon, EyeIcon, EyeOffIcon } from "../assets/Icons/Icons";
import { useMenu } from "../contexts/MenuContext";
import { EditMenu } from "./EditMenu";

export function CardMenu({ menu }) {
  const { handleUpdateMenuStatus } = useMenu();
  const [toggleEditModal, setToggleEditModal] = useState(false);

  const handleToggleEditModal = () => {
    setToggleEditModal(!toggleEditModal);
  };

  const onViewClick = () => {
    handleUpdateMenuStatus(menu.id, !menu.status);
  };

  return (
    <>
      <main className={`card-menu ${menu.status ? "viewed" : ""}`}>
        <section className="img-container-menu">
          <img src={menu.image} alt={menu.name} />
        </section>
        <div className="card-content">
          <section className="title-product-menu">
            <h2>{menu.name}</h2>
            <span className="price-tag">${menu.price}</span>
          </section>
          <section className="description-product-menu">
            <p>{menu.description}</p>
          </section>
          <section className="actions-menu">
            <button className="btn-edit" onClick={handleToggleEditModal}>
              <EditIcon />
            </button>
            <button
              className={`btn-view ${menu.status ? "active" : ""}`}
              onClick={onViewClick}
            >
              {menu.status ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </section>
        </div>
      </main>
      <EditMenu
        toggleModal={toggleEditModal}
        handleToggleModal={handleToggleEditModal}
        menu={menu}
      />
    </>
  );
}
