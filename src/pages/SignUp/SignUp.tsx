import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import TextInput from "../../components/TextInput/TextInput";
import { signUpSchema } from "./signUpSchema";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (value: FieldValues) => {
    signUpSchema.parse(value);
    console.log(value);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(onSubmit)(e)}>
        <TextInput label="id" type="text" errors={errors} {...register("id")} />
        <TextInput
          label="password"
          type="password"
          errors={errors}
          {...register("password")}
        />
        <TextInput
          label="nickname"
          type="text"
          errors={errors}
          {...register("nickname")}
        />
        <button>제출</button>
      </form>
    </div>
  );
};

export default SignUp;
