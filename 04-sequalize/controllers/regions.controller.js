import { Router } from 'express';


const router = Router();

const allRegions = async (req, res) => {
    const regions = await sequelize.query('SELECT region_id,region_name FROM regions', {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.Regions,
        mapToModel: true
      });
   /*  const regions = await req.context.models.Regions.findAll();
    return res.send(regions); */
}

export default{
    allRegions
}