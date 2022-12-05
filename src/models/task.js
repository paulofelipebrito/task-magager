import Sequelize, { Model } from 'sequelize';

class Task extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static init(sequelize){
    super.init({
      due_date: Sequelize.DATE,
      effort: Sequelize.INTEGER,
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      order: Sequelize.INTEGER,
      status: Sequelize.ENUM(
        "backlog",
        "doing",
        "done",
        "approved",
        "rejected",
      ),
      user_id: Sequelize.INTEGER,
      project_id: Sequelize.INTEGER
    }, {
      sequelize,
      name: {
        singular: 'task',
        plural: 'tasks',
      },
    },)
  }
  static associate(models) {
    // define association here
    this.belongsTo(models.User, {
      foreignKey: "user_id"
    });
    this.belongsTo(models.Project, {
      foreignKey: "project_id"
    });
  }
}

export default Task;

