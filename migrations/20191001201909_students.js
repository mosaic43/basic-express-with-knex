
exports.up = function(knex) {
  return knex.schema.createTable('Students', (table) => {
    table.increments('id')
    table.string('name')
    table.boolean('isActive')
    table.integer('cohortId')
    table.foreign('cohortId').references('Cohorts.id')
    table.string('username').unique().notNullable()
    table.string('password').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE Students')
};
