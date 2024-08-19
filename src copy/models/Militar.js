import Sequelize, { Model } from "sequelize";

class Militar extends Model {
  static init(sequelize) {
    super.init(
      {
        idt: Sequelize.INTEGER,
        situacao: Sequelize.BOOLEAN,

        grad: Sequelize.INTEGER,
        name: Sequelize.STRING,
        num: Sequelize.INTEGER,
        dtultimosvpre: Sequelize.DATE,
        dtultimosverm: Sequelize.DATE,
        qtddiaf: Sequelize.INTEGER,
        qtddiafvermelha: Sequelize.INTEGER,
      },
      {
        sequelize,
        name: {
          singular: "militar",
          plural: "militars",
        },
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Graduacao, {
      foreignKey: "grad",
      as: "gradId",
    });
  }
}

export default Militar;
