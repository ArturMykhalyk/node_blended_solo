import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.base': 'Product name must be a string',
    'string.min': 'Product name should have at least {#limit} characters',
    'string.max': 'Product name should have at most {#limit} characters',
    'any.required': 'Product name is required',
  }),

  price: Joi.number().min(0).required().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be a positive number',
    'any.required': 'Product price is required',
  }),

  category: Joi.string()
    .valid('books', 'electronics', 'clothing', 'other')
    .default('other')
    .required()
    .messages({
      'any.only':
        'Category must be one of: books, electronics, clothing, other',
      'any.required': 'Category is required',
    }),

  description: Joi.string().max(500).allow('').messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description should have at most {#limit} characters',
  }),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(50).messages({
    'string.base': 'Product name must be a string',
    'string.min': 'Product name should have at least {#limit} characters',
    'string.max': 'Product name should have at most {#limit} characters',
  }),

  price: Joi.number().min(0).messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be a positive number',
  }),

  category: Joi.string()
    .valid('books', 'electronics', 'clothing', 'other')
    .messages({
      'any.only':
        'Category must be one of: books, electronics, clothing, other',
    }),

  description: Joi.string().max(500).allow('').messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description should have at most {#limit} characters',
  }),

  productId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Product id should be a valid mongo id');
    }
    return true;
  }),
});

export const getProductsQuerySchema = Joi.object({
  category: Joi.string()
    .valid('books', 'electronics', 'clothing', 'other')
    .messages({
      'any.only':
        'Category must be one of: books, electronics, clothing, other',
      'string.base': 'Category must be a string',
    }),

  minPrice: Joi.number().min(0).messages({
    'number.base': 'minPrice must be a number',
    'number.min': 'minPrice must be a positive number',
  }),

  maxPrice: Joi.number().min(0).messages({
    'number.base': 'maxPrice must be a number',
    'number.min': 'maxPrice must be a positive number',
  }),
  page: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Page must be a number',
    'number.integer': 'Page must be an integer',
    'number.min': 'Page must be at least {#limit}',
  }),

  perPage: Joi.number().integer().min(1).max(100).default(10).messages({
    'number.base': 'Limit must be a number',
    'number.integer': 'Limit must be an integer',
    'number.min': 'Limit must be at least {#limit}',
    'number.max': 'Limit must be at most {#limit}',
  }),
});
