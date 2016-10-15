
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('images', function (table) {
    table.increments();
    table.binary('image');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('images');
};
