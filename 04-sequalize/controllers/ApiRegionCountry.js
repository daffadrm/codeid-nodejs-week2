import { sequelize } from '../models/IndexModel';

const createRegionCountries = async (req, res, next) => {
    const { region_id, region_name, countries } = req.body;
    let regions = null;

    //1. check apakah region_id null atau undefineed, jika null,
    // then create region nya
    if (region_id === null || region_id === undefined) {
        // jika null, maka insert dulu data regions

        regions = await req.context.models.Regions.create({
            region_id: region_id,
            region_name: region_name,
        }).catch((error) => {
            return res.send(JSON.stringify({
                name: error.name,
                message: error.message
            }));
        });


    }
    // get region_id di object regions (result pada saat insert)
    const reg_id = regions.region_id;

    if (reg_id !== null || reg_id !== undefined) {
        // gunakan map agar bisa diperlakukan secara asyn dan paralel exec
        countries.map(async (el) => {
            await req.context.models.Countries.create({
                country_id: el.country_id,
                country_name: el.country_name,
                region_id: reg_id
            }).catch((error) => {
                console.log(error.message);
            });;
        });
    }
    next();

}

const regionTransacton = async (req, res, next) => {
    const t = await sequelize.transaction();
    const { region_id, region_name, countries } = req.body;
    let regions = null; 
    try {

        //1. check apakah region_id null atau undefineed, jika null,
        // then create region nya
        if (region_id === null || region_id === undefined) {
            // jika null, maka insert dulu data regions

            regions = await req.context.models.Regions.create({
                region_id: region_id,
                region_name: region_name,
            },{ transaction: t }).catch((error) => {
                return res.send(JSON.stringify({
                    name: error.name,
                    message: error.message
                }));
            });
        }

          // get region_id di object regions (result pada saat insert)
          const reg_id = regions.region_id;

          if (reg_id !== null || reg_id !== undefined) {
              // gunakan map agar bisa diperlakukan secara asyn dan paralel exec
              countries.map(async (el) => {
                  await req.context.models.Countries.create({
                      country_id: el.country_id,
                      country_name: el.country_name,
                      region_id: reg_id
                  },{ transaction: t }).catch((error) => {
                      console.log(error.message);
                  });;
              });
          }

          await t.commit();
          next();

    } catch (error) {
        await t.rollback();
    }

}

// using sequelize transaction
const regionTransacton2 = async (req, res, next) => {
    try {
        // start using transaction 
        const result = await sequelize.transaction(async (t) => {
            const { region_id, region_name, countries } = req.body;
            let regions = null;

            //1. check apakah region_id null atau undefineed, jika null,
            // then create region nya
            if (region_id === null || region_id === undefined) {
                // jika null, maka insert dulu data regions

                regions = await req.context.models.Regions.create({
                    region_id: region_id,
                    region_name: region_name,
                }).catch((error) => {
                    return res.send(JSON.stringify({
                        name: error.name,
                        message: error.message
                    }));
                });


            }
            // get region_id di object regions (result pada saat insert)
            const reg_id = regions.region_id;

            if (reg_id !== null || reg_id !== undefined) {
                // gunakan map agar bisa diperlakukan secara asyn dan paralel exec
                countries.map(async (el) => {
                    await req.context.models.Countries.create({
                        country_id: el.country_id,
                        country_name: el.country_name,
                        region_id: reg_id
                    }).catch((error) => {
                        console.log(error.message);
                    });;
                });
            }
            next();
        });
    } catch (error) {
        return res.send(JSON.stringify({
            name: error.name,
            message: error.message
        }));
    }
}

export default {
    createRegionCountries
}