import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput/TextInput";
import { logInSchema } from "./LoginSchema";

const Login = () => {
  const navigate = useNavigate();
  const EXPIRE_TIME = 10;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(logInSchema),
  });

  const onSubmit = async (value: FieldValues) => {
    logInSchema.parse(value);
    const reponse = await api.auth.logIn(value, EXPIRE_TIME);

    if (reponse.success) {
      alert("로그인 성공!");
      navigate("/");
    } else alert(reponse.message);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] justify-center px-[20px]">
      <div className="flex flex-col border-red-600 border-[15px]">
        <div className="flex flex-row justify-center pb-[30px] font-bold text-[20px]">
          로그인
        </div>
        <form
          onSubmit={(e) => handleSubmit(onSubmit)(e)}
          className="flex flex-col gap-[10px]"
        >
          <TextInput
            label="아이디"
            type="text"
            errors={errors}
            placeholder="아이디를 입력해주세요"
            registerId="id"
            {...register("id")}
          />
          <TextInput
            label="비밀번호"
            type="password"
            errors={errors}
            placeholder="비밀번호를 입력해주세요"
            registerId="password"
            {...register("password")}
          />
          <Button>로그인</Button>
          <div className="flex flex-row justify-center pt-[10px] text-slate-500 text-[14px]">
            <Link to="/signUp">회원가입하기</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
