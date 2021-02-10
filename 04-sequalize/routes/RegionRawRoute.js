// 1. import module Router & sequalize
import { Router } from 'express';
import { sequelize } from '../models/index.model';
//import regionCtrl from '../controllers/regions.controller'

//2. create object Router dan simpan di variable router
const router = Router();


/* 3. method get akan di execute ketika di call api/regions/
  this method use raw query | sql native 
  gunakan QueryTypes.SELECT jika menggunkan rawquery
  this function use asyn-await
*/
router.get('/', async (req, res) => {
  const regions = await sequelize.query('SELECT region_id,region_name FROM regions', {
    type: sequelize.QueryTypes.SELECT,
    model: req.context.models.Regions,
    mapToModel: true
  });
  return res.send(regions);
});

/*  filter by empid
 gunakan bind parameter emp_id : id, lalu isi param bind id = req.param.regionId
 value req.params.regionId diambil dari path mapping  '/:regionId' */

router.get('/:regionId', async (req, res) => {
  const regions = await sequelize.query('SELECT region_id,region_name FROM regions WHERE region_id=:id', {
    replacements: { id: req.params.regionId },
    type: sequelize.QueryTypes.SELECT,
    model: req.context.models.Regions,
    mapToModel: true
  });
  return res.send(regions);
});


// create
router.post('/', async (req, res) => {
  const { region_name } = req.body;
  const regions = await sequelize.query('insert into regions (region_name) values(:regionName)', {
    replacements: { regionName: region_name },
    type: sequelize.QueryTypes.SELECT,
    model: req.context.models.Regions,
    mapToModel: true
  });
  return res.send(regions);
});


// update with put method
router.put('/:regionId', async (req, res) => {
  const { region_name } = req.body;
  const regions = await sequelize.query('UPDATE regions set region_name =:regionName WHERE region_id=:id', {
    replacements: { id: req.params.regionId, regionName: region_name },
    type: sequelize.QueryTypes.SELECT,
    model: req.context.models.Regions,
    mapToModel: true
  });
  return res.send(regions);
});

// delete with delete method
router.delete('/:regionId', async (req, res) => {
  const regions = await sequelize.query('DELETE FROM regions WHERE region_id=:id', {
    replacements: { id: req.params.regionId },
    type: sequelize.QueryTypes.SELECT,
    model: req.context.models.Regions,
    mapToModel: true
  });
  return res.send(regions);
});

export default router;