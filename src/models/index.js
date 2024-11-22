// src/models/index.js
const App = require('./AppModel');
const MethodAccess = require('./MethodAccessModel');
const AppMethodAccess = require('./AppMethodAccessModel');
const Tags = require('./TagModel');
const AppTags = require('./AppTagsModel');
const Responsable = require('./ResponsableModel');
const AppResponsable = require('./AppResponsableModel');

// Establecer relaciones
App.hasMany(AppMethodAccess, { foreignKey: 'appid' });
MethodAccess.hasMany(AppMethodAccess, { foreignKey: 'methodaccessid' });

AppMethodAccess.belongsTo(App, { foreignKey: 'appid' });
AppMethodAccess.belongsTo(MethodAccess, { foreignKey: 'methodaccessid', as: 'methods' });

App.hasMany(AppTags, { foreignKey: 'appid' });
Tags.hasMany(AppTags, { foreignKey: 'tagid' });

AppTags.belongsTo(App, { foreignKey: 'appid' });
AppTags.belongsTo(Tags, { foreignKey: 'tagid', as: 'tags' });

App.hasMany(AppResponsable, { foreignKey: 'appid' });
Responsable.hasMany(AppResponsable, { foreignKey: 'responsableid' });

AppResponsable.belongsTo(App, { foreignKey: 'appid' });
AppResponsable.belongsTo(Responsable, { foreignKey: 'responsableid', as: 'responsablesa' });

module.exports = { App, MethodAccess, AppMethodAccess, Tags, AppTags, Responsable, AppResponsable };