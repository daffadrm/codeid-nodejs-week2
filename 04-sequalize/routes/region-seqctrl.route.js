// 1. import module Router
import { Router } from 'express';
import indexCtrl from '../controllers/index.controller'

//2. create object Router dan simpan di variable router
const router = Router();

/* untuk latihan bisa menggunakan rawSQL, tapi
recommended gunakan sequelize method */

//router.get('/', regionCtrl.findRegionsRawSQL);
//router.get('/', indexCtrl.regions.findRegionsMethod);

router.get('/', indexCtrl.regions.findAll);
router.get('/search/:regionName', indexCtrl.regions.filterRegionByName);
export default router;