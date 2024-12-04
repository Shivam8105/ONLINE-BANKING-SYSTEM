module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    TRANSACTION_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    USERID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TRANSACTION_TYPE: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    AMOUNT: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    TRANSACTION_DATE: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    }
  });

  return Transaction;
};
