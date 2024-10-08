export type TrequestUserInfo = {
  avatar: File | null;
  nickname: string;
};

export type TresponseUserInfo = {
  id: string;
  avatar: string | null;
  nickname: string;
  success: boolean;
};

export type TnoneUserInfo = {
  success: false;
};

export type TuserInfo = TresponseUserInfo | TnoneUserInfo;
