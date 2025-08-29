import "@example/ui/styles/login";

interface LoginPageProps {
  onSnsLogin?: (provider: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSnsLogin }) => {
  const handleSnsLogin = (provider: string) => {
    if (onSnsLogin) {
      onSnsLogin(provider);
    } else {
      console.log(`Login with ${provider}`);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome Example</h1>
        <p>Sign in to your account</p>

        <div className="sns-buttons">
          <button
            className="sns-button google"
            onClick={() => handleSnsLogin("google")}
          >
            <span className="sns-icon">G</span>
            Continue with Google
          </button>

          <button
            className="sns-button apple"
            onClick={() => handleSnsLogin("apple")}
          >
            <span className="sns-icon">A</span>
            Continue with Apple
          </button>

          <button
            className="sns-button kakao"
            onClick={() => handleSnsLogin("kakao")}
          >
            <span className="sns-icon">K</span>
            Continue with Kakao
          </button>

          <button
            className="sns-button naver"
            onClick={() => handleSnsLogin("naver")}
          >
            <span className="sns-icon">N</span>
            Continue with NAVER
          </button>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <form className="login-form">
          <div className="form-group">
            <input type="email" placeholder="Email" className="form-input" />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <a href="#signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
