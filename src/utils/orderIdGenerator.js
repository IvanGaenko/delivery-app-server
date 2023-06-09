export const orderIdGenerator = (min, max, len) => {
  const orderId = [];
  for (let i = 0; i < len; i++) {
    orderId.push(Math.floor(Math.random() * (max - min + 1) + min));
  }
  return orderId.join("");
};
