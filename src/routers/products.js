import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createProductController,
  deleteProductController,
  getProductByIdController,
  getProductsContoller,
  patchProductController,
} from '../controllers/products.js';

const router = Router();
router.get('/products', ctrlWrapper(getProductsContoller));

router.get('/products/:productId', ctrlWrapper(getProductByIdController));

router.post('/products', ctrlWrapper(createProductController));

router.patch('/products/:productId', ctrlWrapper(patchProductController));

router.delete('/products/:productId', ctrlWrapper(deleteProductController));

export default router;
