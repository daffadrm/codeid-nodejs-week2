import { Router } from 'express';


const router = Router();

const allRegions = async (req, res) => {
    const regions = await req.context.models.Regions.findAll();
    return res.send(regions);
}

export default{
    allRegions
}