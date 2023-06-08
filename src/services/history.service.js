import pool from "../db/pool";

export const getUserOrders = async (id) => {
  const orders = await pool.query(
    "SELECT * FROM orders WHERE userid = $1 ORDER BY id ASC",
    [id]
  );
  return orders.rows;
};

export const getOrderProducts = async (orders) => {
  const orderHistory = [];

  if (orders.length > 0) {
    for (let i = 0; i < orders.length; i++) {
      const currentOrder = orders[i];

      const orderToProduct = await pool.query(
        "SELECT * FROM ordersproducts WHERE orderid = $1 ORDER BY id ASC",
        [currentOrder.id]
      );

      const products = [];
      if (orderToProduct.rows.length > 0) {
        for (let j = 0; j < orderToProduct.rows.length; j++) {
          const product = await pool.query(
            "SELECT * FROM products WHERE id = $1 ORDER BY id ASC",
            [orderToProduct.rows[j].productid]
          );

          products.push({
            quantity: orderToProduct.rows[j].quantity,
            product: product.rows[0],
          });
        }
      }

      orderHistory.push({
        ...currentOrder,
        cart: products,
      });
    }
  }
  return orderHistory;
};
