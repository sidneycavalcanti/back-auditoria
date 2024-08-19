import Sequelize, { Model } from "sequelize";

class Graduacao extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        name: {
          singular: "graduacao",
          plural: "graduacoes",
        },
      }
    );
  }
  // static associate(models) {
  //   this.hasMany(models.Militar, { foreignKey: "grad" });
  // }
}

export default Graduacao;
