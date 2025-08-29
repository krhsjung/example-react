import typescriptLogo from "/typescript.svg";
import { Header, Counter } from "@example/ui";

interface User {
  id?: string;
  name?: string;
  email?: string;
  picture?: string;
}

interface HomeProps {
  onLogout: () => void;
  user?: User | null;
}

const Home: React.FC<HomeProps> = ({ onLogout, user }) => {
  return (
    <div className="home-page">
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {user && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "white",
            }}
          >
            {user.picture && (
              <img
                src={user.picture}
                alt={user.name}
                style={{ width: "32px", height: "32px", borderRadius: "50%" }}
              />
            )}
            <span>{user.name || user.email}</span>
          </div>
        )}
        <button
          onClick={onLogout}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            background: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" className="logo" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img
          src={typescriptLogo}
          className="logo vanilla"
          alt="TypeScript logo"
        />
      </a>
      <Header title="Web" />
      <div className="card">
        <Counter />
      </div>
    </div>
  );
};

export default Home;
