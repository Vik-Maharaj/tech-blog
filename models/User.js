const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

// Defines user table configuration
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, 
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6] // length of password, can add number and special character params after
            }
        }
    },
    {  
        hooks: {
            // Runs before the user created method
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            //Runs before the update user method
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },   
        sequelize,
        timestamps: false,
        freezeTableName: true, 
        underscored: true, 
        modelName: 'user'
    }
);

module.exports = User;