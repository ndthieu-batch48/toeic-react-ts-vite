import { axiosBase } from "@/lib/axios";
import type { Test } from "../types/test";

export const getAllTests = async (): Promise<Test[]> => {
  const url = 'tests/all';
  const res = await axiosBase.get(url);
  return res.data;
};

export const getTestDetail = async (id: number): Promise<unknown> => {
  const url = `tests/${id}`;
  const res = await axiosBase.get(url);
  return res.data;
};