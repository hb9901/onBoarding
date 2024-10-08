import { Link, useLoaderData, useNavigate } from "react-router-dom";
import YoloIcon from "../../../icons/YoloIcon.svg";
import { TuserInfo } from "../../../types/userInfo.type";

const Header = () => {
  const data = useLoaderData() as TuserInfo;
  const navigate = useNavigate();
  const handleClickLogo = () => {
    navigate("/");
  };

  return (
    <header className="sticky top-0 flex flex-row w-full px-[20px] py-[10px] justify-between items-center bg-red-400">
      <button className="w-[50px] h-[50px]" onClick={handleClickLogo}>
        <img src={YoloIcon} className="object-cover" />
      </button>

      <div className="flex flex-row gap-1">
        {data.success ? (
          <Link to="/mypage">MyPage</Link>
        ) : (
          <>
            <Link to="login">Login</Link>
            <Link to="signUp">signUp</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
