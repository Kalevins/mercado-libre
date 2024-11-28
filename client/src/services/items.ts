import { axiosInstance } from "@/services";
import { Items, ItemsById } from "@/types";

interface GetItemsProps {
  offset: number;
  query: string;
}

export const getItems = async ({ offset, query }: GetItemsProps): Promise<Items> => {
  const { data } = await axiosInstance.get(`/api/items?offset=${offset}&q=${query}`);
  return data;
}

export const getItemById = async (id: string): Promise<ItemsById> => {
  const { data } = await axiosInstance.get(`/api/items/${id}`);
  return data;
}