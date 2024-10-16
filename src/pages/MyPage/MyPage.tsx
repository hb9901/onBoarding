import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import api from "../../api/api";
import Button from "../../components/Button";
import Card from "../../components/Card";
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

    api.auth.updateToken();
    const data = await api.auth.updateUserInfo(userInfo);
    if (data) {
      setToastOpen({
        id,
        content: data.message,
        delay: 5000,
      });
    }
  };

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (!file) {
      setToastOpen({
        id,
        content: "잘못된 입니다.",
        delay: 5000,
      });
      return;
    }
    if (file.size > 300000) {
      setToastOpen({
        id,
        content: "이미지 파일이 너무 큽니다.",
        delay: 5000,
      });
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
      <Card>
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
      </Card>
    </div>
  );
};

export default MyPage;
