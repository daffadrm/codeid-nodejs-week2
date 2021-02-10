// 1. import module Router & sequalize
import { Router } from 'express';

//2. create object Router dan simpan di variable router
const router = Router();

// 3. this function use method or function sequalize
router.get('/', async (req, res) => {
  const regions = await req.context.models.Regions.findAll();
  return res.send(regions);
});

router.get('/:regionId', async (req, res) => {
  const regions = await req.context.models.Regions.findByPk(
    req.params.regionId,
  );
  return res.send(regions);
});

// post
router.post('/', async (req, res) => {
  const { region_id, region_name } = req.body;
  const regions = await req.context.models.Regions.create({
    region_id: region_id,
    region_name: region_name,
  });

  return res.send(regions);
});

// put
router.put('/:regionId', async (req, res) => {
  const { region_name } = req.body;
  const regions = await req.context.models.Regions.update(
    {region_name: region_name},// nama attribute yg akan di update
    {returning: true,where: { region_id: req.params.regionId } });

  return res.send(regions);
});

/*  sesuaikan parameter yg diinput sama dengan attribute region_id di table
 setelah clause where */
router.delete('/:regionId', async (req, res) => {
  const result = await req.context.models.Regions.destroy({
    where: { region_id: req.params.regionId },
  });

  return res.send(true);
});

export default router;