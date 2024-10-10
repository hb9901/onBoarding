import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import api from "../../api/api";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput/TextInput";
import useToastStore from "../../store/toast.store";
import { TresponseUserInfo } from "../../types/userInfo.type";
import { myPageSchema } from "./myPageSchema";

const MyPage = () => {
  const id = crypto.randomUUID();
  const { avatar, nickname } = useLoaderData() as TresponseUserInfo;
  const [imageFile, setImageFile] = useState<File | null>();
  const [imageURL, setImageURL] = useState<string | ArrayBuffer | null>(avatar);
  const setToastOpen = useToastStore((state) => state.setToastOpen);

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
      setToastOpen({
        id,
        content: "이미지 파일을 변경해주세요.",
        delay: 5000,
      });
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
    <div className="flex flex-col px-[20px] pt-[60px] lg:items-center">
      <div className="border-2 border-solid border-red-400 p-[20px] lg:min-w-[600px] ">
        <strong className="flex flex-row justify-center pb-[30px] font-bold text-[20px]">
          MyPage
        </strong>
        <form
          onSubmit={(e) => handleSubmit(onSubmit)(e)}
          className="flex flex-col gap-[10px]"
        >
          <div className="flex flex-col items-center">
            <label
              htmlFor="imgFile"
              className="flex items-center justify-center aspect-auto w-[160px] h-[160px] rounded-full cursor-pointer"
            >
              {imageURL && (
                <img
                  src={imageURL.toString()}
                  className="w-[160px] h-[160px] object-cover rounded-full"
                />
              )}
            </label>
            <input
              id="imgFile"
              type="file"
              onChange={handleProfileImageChange}
              className="hidden"
            />
          </div>
          <TextInput
            label="닉네임"
            type="text"
            errors={errors}
            registerId="nickname"
            {...register("nickname")}
          />
          <Button>프로필 수정</Button>
        </form>
      </div>
    </div>
  );
};

export default MyPage;
