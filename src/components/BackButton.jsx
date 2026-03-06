import { useNavigate } from "react-router-dom";
import { CircleArrowLeft } from "../assets/Icons/Icons";
import "./styles/BackButton.css";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-button-module" onClick={() => navigate(-1)}>
      <CircleArrowLeft />
      <span>Regresar</span>
    </button>
  );
};
