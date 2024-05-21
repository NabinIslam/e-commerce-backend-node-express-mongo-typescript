import express from 'express';
import { productControllers } from './product.controller';

const router = express.Router();

router.post('/', productControllers.addProduct);
router.get('/', productControllers.retrieveAllProducts);
router.get('/:productId', productControllers.retrieveAProductById);
router.delete('/:productId', productControllers.deleteAProductById);

export const productRoutes = router;
