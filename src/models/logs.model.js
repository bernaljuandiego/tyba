
module.exports = (sequelize, Sequelize) => {
    const logs = sequelize.define("logs", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nameService:{
            type: Sequelize.STRING,
            allowNull: false,
            field:'nombre_servicio'

        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
            field:'correo'

        },
        description:{
            type: Sequelize.STRING,
            allowNull: false,
            field:'descripcion'

        },
        method:{
            type: Sequelize.STRING,
            allowNull: false,
            field:'metodo'

        },
        urlService:{
            type: Sequelize.STRING,
            allowNull: false,
            field:'url_servicio'

        },
        requestBody:{
            type: Sequelize.STRING,
            allowNull: false,
            field:'request_body'

        },
        responseBody:{
            type: Sequelize.STRING,
            allowNull: false,
            field:'response_body'

        },
        dateCreate: {
            type: Sequelize.DATE,
            field:'fecha_creacion'
        },
      
        dateUpdate: {
            type: Sequelize.DATE,
            field:'fecha_actualizacion'
        }                
    },
        {
            tableName: 'logs',
            timestamps: false
        }
    );

    return logs;
};
