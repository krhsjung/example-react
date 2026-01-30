import { UserDto } from "@example/shared";

interface HomeProps {
  onLogout: () => void;
  user?: UserDto | null;
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
            <img
              src={user.picture ?? "/vite.svg"}
              alt={user.name}
              style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            />
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
    </div>
  );
};

export default Home;
