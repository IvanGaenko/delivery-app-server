import { fetchData } from "../services/shop.service";

export const productsController = async (req, res) => {
  const data = await fetchData();

  return res.status(200).json({
    success: true,
    data,
  });
};
