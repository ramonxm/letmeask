import { FormEvent } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Button from "../components/Button";
import "../styles/auth.scss";
import { database } from "../services/firebase";

const Home = () => {
  const history = useHistory();
  const [roomCode, setRoomCode] = useState("");
  const { user, signInWithGoogle } = useAuth();
  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  const handleJoinRoom = async (e: FormEvent) => {
    e.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  };
  return (
    <div id="page-auth">
      <aside>
        <img
          src="../assets/images/illustration.svg"
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src="../assets/images/logo.svg" alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src="../assets/images/google-icon.svg" alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
