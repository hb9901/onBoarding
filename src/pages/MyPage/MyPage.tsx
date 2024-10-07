import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import api from "../../api/api";
import TextInput from "../../components/TextInput/TextInput";
import {
  TresponseUserInfo
} from "../../types/userInfo.type";
import { myPageSchema } from "./myPageSchema";

const MyPage = () => {
  const { avatar, nickname } = useLoaderData() as TresponseUserInfo;
  const [imageFile, setImageFile] = useState<File | null>();
  const [imageURL, setImageURL] = useState<string | ArrayBuffer | null>(avatar);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: nickname,
    },
    resolver: zodResolver(myPageSchema),
  });

  const onSubmit = async (value: FieldValues) => {
    myPageSchema.parse(value);
    if (!imageFile) {
      alert("이미지가 없습니다");
      return;
    }
    const userInfo = {
      avatar: imageFile,
      nickname: value.nickname,
    };

    const data = await api.auth.updateUserInfo(userInfo);
    console.log(data);
  };

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    if (file.size > 3000000) {
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageURL(reader.result);
    };
  };
  return (
    <div>
      <strong>MyPage</strong>
      <form onSubmit={(e) => handleSubmit(onSubmit)(e)}>
        {imageURL && <img src={imageURL.toString()} />}
        <input type="file" onChange={handleProfileImageChange} />
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

export default MyPage;
