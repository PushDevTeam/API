var azureMobileApps = require('azure-mobile-apps');

var table = azureMobileApps.table();
table.columns = {
	'username': 'string',
	'gender': 'string',
	'age_group': 'string',
	'fit_level': 'string',
	'fitness_goals': 'string',
	'cast': 'string',
	'exercise_types': 'string'
};
 
table.dynamicSchema = false;
// Configure specific code when the client does a request
// READ - only return records belonging to the authenticated user
// table.read(function (context) {
//   context.query.where({ userId: context.user.id });
//   return context.execute();
// });

// CREATE - add or overwrite the userId based on the authenticated user
// table.insert(function (context) {
//   context.item.userId = context.user.id;
//   return context.execute();
// });

// UPDATE - for this scenario, we don't need to do anything - this is
// the default version
//table.update(function (context) {
//  return context.execute();
//});

// DELETE - for this scenario, we don't need to do anything - this is
// the default version
//table.delete(function (context) {
//  return context.execute();
//});

// Finally, export the table to the Azure Mobile Apps SDK - it can be
// read using the azureMobileApps.tables.import(path) method

module.exports = table;