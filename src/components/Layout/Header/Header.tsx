import { Link } from "react-router-dom";

const Header = () => {
  return <div>
    <strong>Header</strong>
    <div className="flex flex-row gap-1">
      <Link to="/">Home</Link>
      <Link to="/mypage">MyPage</Link>
      <Link to="login">Login</Link>
      <Link to="signUp">signUp</Link>
    </div>
  </div>;
};

export default Header;
