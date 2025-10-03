import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createProductController,
  deleteProductController,
  getProductByIdController,
  getProductsContoller,
  patchProductController,
} from '../controllers/products.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createProductSchema,
  getProductsQuerySchema,
  updateProductSchema,
} from '../validation/products.js';
import { validateQuery } from '../middlewares/validateQuery.js';
const router = Router();
router.get(
  '/',
  validateQuery(getProductsQuerySchema),
  ctrlWrapper(getProductsContoller),
);

router.get('/:productId', isValidId, ctrlWrapper(getProductByIdController));

router.post(
  '/',
  validateBody(createProductSchema),
  ctrlWrapper(createProductController),
);

router.patch(
  '/:productId',
  isValidId,
  validateBody(updateProductSchema),
  ctrlWrapper(patchProductController),
);

router.delete('/:productId', isValidId, ctrlWrapper(deleteProductController));

export default router;
