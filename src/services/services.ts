import products from '../products.json'

// eslint-disable-next-line prefer-const
let data = [...products];

export const getItems = () => {
    return data;
  };