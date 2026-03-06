import "./styles/Menu.css";
import { CardMenu } from "../src/components/CardMenu";
import { CardAdd } from "../src/components/CardAdd";
import { useMenu } from "../src/contexts/MenuContext";
import { BackButton } from "../src/components/BackButton";
export function Menu() {
  const { menusData } = useMenu();
  return (
    <main className="menu-container">
      <BackButton />
      <h1>¿Que vamos a cocinar hoy?</h1>
      <section className="card-menu-container">
        <CardAdd />
        {menusData.map((menu) => (
          <CardMenu key={menu.id} menu={menu} />
        ))}
      </section>
    </main>
  );
}
