import { sequelize, Op } from '../models/index.model';


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

// put your business logic using method sequalize
// findAll = select * from regions
const findAll = async (req, res) => {
    const regions = await req.context.models.Regions.findAll({});
    return res.send(regions);
}

// findByPK
const findRegionById = async (req, res) => {
    const regions = await req.context.models.Regions.findByPk(
        req.params.regionId,
    );
    return res.send(regions);
}

/*  filter by region_name 
 sql : select * from region where region_name like 'As%'
 stelah klausa where tentukan nama field yg akan difilter 
 pastikan object Op di export dari index.model*/
const filterRegionByName = async (req, res) => {
    const regions = await req.context.models.Regions.findAll(
        {
            where: 
                { region_name: {[Op.like]: req.params.regionName+"%"}}

        }
    );
    return res.send(regions);
}


// Gunakan export default agar semua function bisa dipakai di file lain.
export default {
    findRegionsRawSQL,
    findRegionsMethod,
    findAll,
    filterRegionByName
}