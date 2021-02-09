// 1. import module Router
import { Router } from 'express';
import regionCtrl from '../controllers/regions.controller'

//2. create object Router dan simpan di variable router
const router = Router();

router.get('/', regionCtrl.findRegionsRawSQL);
router.get('/method', regionCtrl.findRegionsMethod);

export default router;