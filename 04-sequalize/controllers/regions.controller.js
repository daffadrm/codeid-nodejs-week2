import { Router } from 'express';
import { sequelize } from '../models/index.model';

// put your business logic using raw query
const findRegionsRawSQL = async (req, res) => {
    const regions = await sequelize.query('SELECT region_id,region_name FROM regions', {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.Regions,
        mapToModel: true
      });
      return res.send(regions);
}

// put your business logic using method sequalize
const findRegionsMethod = async (req, res) => {
    const regions = await req.context.models.Regions.findAll();
    return res.send(regions); 
}

export default{
    findRegionsRawSQL,
    findRegionsMethod
}