import { ProductsCollection } from '../db/models/products.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllProducts = async ({
  category,
  minPrice,
  maxPrice,
  page = 1,
  perPage = 10,
}) => {
  const query = {};

  if (category) {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const skip = (page - 1) * perPage;

  const productsCount = await ProductsCollection.countDocuments(query);

  const products = await ProductsCollection.find(query)
    .skip(skip)
    .limit(Number(perPage));

  const paginationData = calculatePaginationData(productsCount, perPage, page);
  return {
    products,
    ...paginationData,
  };
};

export const getProductsById = async (productId) => {
  const products = await ProductsCollection.findById(productId);
  return products;
};
export const createProduct = async (payload) => {
  const product = await ProductsCollection.create(payload);
  return product;
};
export const updateProduct = async (productId, payload, options = {}) => {
  const rawResult = await ProductsCollection.findOneAndUpdate(
    { _id: productId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    product: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
export const deleteProduct = async (productId) => {
  const product = await ProductsCollection.findOneAndDelete({
    _id: productId,
  });

  return product;
};
