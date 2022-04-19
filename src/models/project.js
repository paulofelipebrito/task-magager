import Sequelize, { Model } from 'sequelize';

class Project extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      description: Sequelize.TEXT,
      status: Sequelize.ENUM('active', 'archived'),
      user_id: Sequelize.INTEGER,      
    }, {
      sequelize,
      name: {
        singular: 'project',
        plural: 'projects',
      },
    })
  }
  static associate(models) {
    // define association here
    this.belongsTo(models.User,{
      foreignKey: 'user_id',
    });
    this.hasMany(models.Task);
  }
}

export default Project;