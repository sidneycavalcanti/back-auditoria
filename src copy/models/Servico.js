import Sequelize, { Model } from "sequelize";

class Servico extends Model {
  static init(sequelize) {
    super.init(
      {
        data: Sequelize.DATE,

        bi: Sequelize.INTEGER,
        escala: Sequelize.BOOLEAN,
    
        oficial_id: Sequelize.INTEGER,
        sgtdia_id: Sequelize.INTEGER,
        cbgd_id: Sequelize.INTEGER,
        moto_id: Sequelize.INTEGER,
        rancho_id: Sequelize.INTEGER,
        parmcav_id: Sequelize.INTEGER,

        auxrancho1_id: Sequelize.INTEGER,
        auxrancho2_id: Sequelize.INTEGER,
        auxrancho3_id: Sequelize.INTEGER,

        frente1_id: Sequelize.INTEGER,
        frente2_id: Sequelize.INTEGER,
        frente3_id: Sequelize.INTEGER,

        tras1_id: Sequelize.INTEGER,
        tras2_id: Sequelize.INTEGER,
        tras3_id: Sequelize.INTEGER,

        aloj1_id: Sequelize.INTEGER,
        aloj2_id: Sequelize.INTEGER,
        aloj3_id: Sequelize.INTEGER,

        garagem1_id: Sequelize.INTEGER,
        garagem2_id: Sequelize.INTEGER,
        garagem3_id: Sequelize.INTEGER,

        pavsup1_id: Sequelize.INTEGER,
        pavsup2_id: Sequelize.INTEGER,

        armeiro_id: Sequelize.INTEGER,

        patrulha: Sequelize.STRING,
        instrucao: Sequelize.STRING,
        geraladm: Sequelize.STRING,
        jusdis: Sequelize.STRING,

      },
      {
        sequelize,
        name: {
          singular: "servico",
          plural: "servicos",
        },
      }
    );
  }

  static associate(models) {

    this.belongsTo(models.Militar, {foreignKey: 'oficial_id', as: 'oficialId'});
    this.belongsTo(models.Militar, {foreignKey: 'sgtdia_id', as: 'sgtdiaId'});
    this.belongsTo(models.Militar, {foreignKey: 'cbgd_id', as: 'cbgdId'});
    this.belongsTo(models.Militar, {foreignKey: 'rancho_id', as: 'ranchoId'});
    this.belongsTo(models.Militar, {foreignKey: 'moto_id', as: 'motoId'});
    this.belongsTo(models.Militar, {foreignKey: 'parmcav_id', as: 'parmcavId'});

    this.belongsTo(models.Militar, {foreignKey: 'auxrancho1_id', as: 'auxrancho1Id'});
    this.belongsTo(models.Militar, {foreignKey: 'auxrancho2_id', as: 'auxrancho2Id'});
    this.belongsTo(models.Militar, {foreignKey: 'auxrancho3_id', as: 'auxrancho3Id'});

    this.belongsTo(models.Militar, {foreignKey: 'frente1_id', as: 'frente1Id'});
    this.belongsTo(models.Militar, {foreignKey: 'frente2_id', as: 'frente2Id'});
    this.belongsTo(models.Militar, {foreignKey: 'frente3_id', as: 'frente3Id'});

    this.belongsTo(models.Militar, {foreignKey: 'tras1_id', as: 'tras1Id'});
    this.belongsTo(models.Militar, {foreignKey: 'tras2_id', as: 'tras2Id'});
    this.belongsTo(models.Militar, {foreignKey: 'tras3_id', as: 'tras3Id'});

    this.belongsTo(models.Militar, {foreignKey: 'aloj1_id', as: 'aloj1Id'});
    this.belongsTo(models.Militar, {foreignKey: 'aloj2_id', as: 'aloj2Id'});
    this.belongsTo(models.Militar, {foreignKey: 'aloj3_id', as: 'aloj3Id'});

    this.belongsTo(models.Militar, {foreignKey: 'garagem1_id', as: 'garagem1Id'});
    this.belongsTo(models.Militar, {foreignKey: 'garagem2_id', as: 'garagem2Id'});
    this.belongsTo(models.Militar, {foreignKey: 'garagem3_id', as: 'garagem3Id'});

    this.belongsTo(models.Militar, {foreignKey: 'pavsup1_id', as: 'pavsup1Id'});
    this.belongsTo(models.Militar, {foreignKey: 'pavsup2_id', as: 'pavsup2Id'});


    this.belongsTo(models.Militar, {foreignKey: 'armeiro_id', as: 'armeiroId'});
    
  }

}

export default Servico;
