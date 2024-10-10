import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput/TextInput";
import useAuth from "../../hooks/useAuth";
import useToastStore from "../../store/toast.store";
import { signUpSchema } from "./signUpSchema";

const SignUp = () => {
  const id = crypto.randomUUID();
  const navigate = useNavigate();
  const { signUp } = useAuth({});
  const setToastOpen = useToastStore((state) => state.setToastOpen);
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
      setToastOpen({
        id,
        content: "회원가입에 성공하였습니다.",
        delay: 5000,
      });
      navigate("/login");
    } else
      setToastOpen({
        id,
        content: reponse.error,
        delay: 5000,
      });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] justify-center px-[20px] lg:items-center">
      <div className="border-2 border-solid border-red-400 p-[20px] lg:min-w-[600px]">
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
    </div>
  );
};

export default SignUp;
