import express from 'express';
import { productControllers } from './product.controller';

const router = express.Router();

router.post('/', productControllers.addProduct);
router.get('/', productControllers.retrieveAllProducts);

export const productRoutes = router;
