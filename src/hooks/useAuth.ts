import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import api from "../api/api";
import { EXPIRE_TIME } from "../constants/constants";
import { TuserInfo } from "../types/userInfo.type";

interface useAuthProps {
  enabled?: boolean;
  initialData?: TuserInfo;
}

const useAuth = ({ enabled = false, initialData }: useAuthProps) => {
  const queryClient = useQueryClient();
  const { data: userInfo } = useQuery<TuserInfo | undefined>({
    queryKey: ["user"],
    queryFn: () => api.auth.getUserInfo(),
    enabled,
    initialData,
  });

  const { mutateAsync: signUp } = useMutation({
    mutationFn: (data: FieldValues) => api.auth.signUp(data),
  });

  const { mutateAsync: logIn } = useMutation({
    mutationFn: (data: FieldValues) => api.auth.logIn(data, EXPIRE_TIME),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { userInfo, signUp, logIn };
};

export default useAuth;
