import { axiosJWT } from "@/lib/axios";

export const getAllTest = async () => {
  const url = 'tests/all'
  const res = await axiosJWT.get(url);
  return res.data;
};
