module.exports = (models) => {
    models.posts.belongsTo(models.users, { foreignKey: 'UserId' });
};