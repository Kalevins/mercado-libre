import { Request, Response, Router } from "express";

import { getItems, getItemsById, getDescriptionById, getCategoryById } from "../services/items";
import { Items, ItemsById } from "../types";

export const ItemsRouter = Router();

ItemsRouter.get("/", async (request: Request, response: Response<Items>) => {
  const query = request.query.q ? String(request.query.q) : "";
  const offset = request.query.offset ? Number(request.query.offset) : 0;

  try {
    const itemsResponse = await getItems({query, offset})

    const items: Items = {
      categories: itemsResponse.filters.find((filter) => filter.id === "category")?.values.map((category) => category.name) || [],
      items: itemsResponse.results.map((item) => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: 0,
          regular_amount: item.original_price,
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        installments: {
          quantity: item.installments.quantity,
          amount: item.installments.amount,
        }
      })),
    };

    response.json(items);
  } catch (error) {
    console.log(error);
  }
});

ItemsRouter.get("/:id", async (request: Request, response: Response<ItemsById>) => {
  const id = request.params.id;

  try {
    const item = await getItemsById(id);
    const description = await getDescriptionById(id);
    const category = await getCategoryById(item.category_id);

    const itemResponse = {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: 0,
        regular_amount: item.original_price,
      },
      pictures: item.pictures.map((picture) => picture.url),
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity || null,
      installments: {
        quantity: item?.installments?.quantity || null,
        amount: item?.installments?.amount || null
      },
      description: description.plain_text,
      attributes: item.attributes.map((attribute) => ({
        id: attribute.id,
        name: attribute.name,
        value_name: attribute.value_name,
      })),
      category_path_from_root: category.path_from_root.map((category) => category.name),
    };

    response.json({ item: itemResponse});
  } catch (error) {
    console.log(error);
  }

});