import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import api from "../../api/api";
import TextInput from "../../components/TextInput/TextInput";
import { logInSchema } from "./LoginSchema";

const Login = () => {
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
      console.log(reponse);
      if (reponse.success) alert("로그인 성공!");
      else alert(reponse.message);
    };

    return (
      <div>
        <form onSubmit={(e) => handleSubmit(onSubmit)(e)}>
          <TextInput
            label="id"
            type="text"
            errors={errors}
            {...register("id")}
          />
          <TextInput
            label="password"
            type="password"
            errors={errors}
            {...register("password")}
          />
          <button>제출</button>
        </form>
      </div>
    );
};

export default Login;
