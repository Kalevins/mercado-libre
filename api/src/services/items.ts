import { CategoryByIdDTO, DescriptionByIdDTO, ItemsByIdDTO, ItemsDTO, ItemsProps, UserByIdDTO } from "../types";

export const getItems = async ({query, offset}: ItemsProps): Promise<ItemsDTO> => {
  const items = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&offset=${offset}&limit=10`);
  const data = await items.json();
  return data;
}

export const getItemsById = async (id: string): Promise<ItemsByIdDTO> => {
  const items = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await items.json();
  return data;
}

export const getDescriptionById = async (id: string): Promise<DescriptionByIdDTO> => {
  const items = await fetch(`https://api.mercadolibre.com/items/${id}/description`);
  const data = await items.json();
  return data;
}

export const getCategoryById = async (id: string): Promise<CategoryByIdDTO> => {
  const items = await fetch(`https://api.mercadolibre.com/categories/${id}`);
  const data = await items.json();
  return data;
}

export const getUserById = async (id: number): Promise<UserByIdDTO> => {
  const items = await fetch(`https://api.mercadolibre.com/users/${id}`);
  const data = await items.json();
  return data;
}
