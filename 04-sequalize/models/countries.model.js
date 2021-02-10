const countries = (sequelize, DataTypes) => {
    const Countries = sequelize.define('countries', {
        country_id: {
          type: DataTypes.CHAR(2),
          allowNull: false,
          primaryKey: true
        },
        country_name: {
          type: DataTypes.STRING(40),
          allowNull: true
        },
        region_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'regions',
            key: 'region_id'
          }
        }
      }, {
        sequelize,
        tableName: 'countries',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: "countries_pkey",
            unique: true,
            fields: [
              { name: "country_id" },
            ]
          },
        ]
      });

    return Countries;
}

export default countries;