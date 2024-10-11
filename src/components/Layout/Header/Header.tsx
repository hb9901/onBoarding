import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import YoloIcon from "../../../icons/YoloIcon";
import { TuserInfo } from "../../../types/userInfo.type";

const Header = () => {
  const data = useLoaderData() as TuserInfo;
  const { userInfo, logOut } = useAuth({ enabled: true, initialData: data });
  const navigate = useNavigate();
  const handleClickLogo = () => {
    navigate("/");
  };

  const handleClickLogOut = () => {
    logOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 flex flex-row w-full px-[20px] py-[10px] justify-between items-center bg-red-400 z-20">
      <button className="w-[50px] h-[50px]" onClick={handleClickLogo}>
        <YoloIcon />
      </button>

      <div className="flex flex-row gap-1 font-bold">
        {userInfo?.success ? (
          <div className="flex felx-row gap-2">
            <Link to="/mypage">마이페이지</Link>
            <span>|</span>
            <a onClick={handleClickLogOut} className="cursor-pointer">로그아웃</a>
          </div>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
