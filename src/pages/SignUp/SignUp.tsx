import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput/TextInput";
import useAuth from "../../hooks/useAuth";
import { signUpSchema } from "./signUpSchema";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (value: FieldValues) => {
    signUpSchema.parse(value);
    const reponse = await signUp(value);
    
    if (reponse.success) {
      alert("회원가입 성공!");
      navigate("/login");
    } else alert(reponse.message);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] justify-center px-[20px]">
      <div className="flex flex-row justify-center pb-[30px] font-bold text-[20px]">
        회원가입
      </div>
      <form
        onSubmit={(e) => handleSubmit(onSubmit)(e)}
        className="flex flex-col gap-[10px]"
      >
        <TextInput
          label="아이디"
          type="text"
          errors={errors}
          registerId="id"
          {...register("id")}
        />
        <TextInput
          label="패스워드"
          type="password"
          errors={errors}
          registerId="password"
          {...register("password")}
        />
        <TextInput
          label="닉네임"
          type="text"
          errors={errors}
          registerId="nickname"
          {...register("nickname")}
        />
        <Button>회원가입</Button>
        <div className="flex flex-row justify-center pt-[10px] text-slate-500 text-[14px]">
          <Link to="/logIn">로그인하기</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
