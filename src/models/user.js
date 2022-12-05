import Sequelize, { Model } from 'sequelize';
import {createPasswordHash, checkPassword} from '../services/auth';

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static init(sequelize){
    super.init({
      initials:{// you can add logic here
        type: Sequelize.VIRTUAL,
        get(){
          // "PAULO FELIPE" -> "PF"
          // [0] = PAULO
          // [1] = FELIPE
          // FF

          //PAULO 
          //P
          const match = this.name.split(" ");
          if(match.length > 1){
            return `${match[0][0]}${match[match.length -1][0]}`;
          } else {
            return match[0][0];
          }
        }
      },
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      role: Sequelize.ENUM("admin","manager","developer"),
      status: Sequelize.ENUM("active","archived"),
    }, {
      sequelize,
      name: {
        singular: 'user',
        plural: 'users',
      },
    },
    {hooks: {
      beforeSave: async (user) => {
        if(user.password){
          user.password_hash = await createPasswordHash(user.password)
        }
        console.log(user.password)
      }
    }}
    );
    /*this.addHook(('beforeSave', async (user) => {
      if(user.password){
        user.password_hash = await createPasswordHash(user.password)
      }
    }))*/
    
  }

  static associate(models) {
    // define association here
    this.hasMany(models.Project);
    this.hasMany(models.Task);
  }

  checkPassword(password) {
    return checkPassword(this, password);
  }
}

export default User;