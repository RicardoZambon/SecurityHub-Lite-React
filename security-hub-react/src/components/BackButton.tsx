import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import styles from "./BackButton.module.css";

export default function BackButton() {
  const navigate: NavigateFunction = useNavigate();

  return (
    <button className={styles.button} onClick={() => navigate(-1)}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
}
