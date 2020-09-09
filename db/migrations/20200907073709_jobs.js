
exports.up = function(knex, promise) {
  return knex.schema.createTable('jobs', function(table) {
    table.increments();
    table.string('type').notNullable()
    table.string('request').notNullable().defaultTo('{"request":"null_request"}')
    table.string('response')
    table.datetime('timeRequested').defaultTo(knex.fn.now(6))
    table.string('timeStarted')
    table.string('timeComplete')
    table.integer('maxRetries').defaultTo("5")
    table.integer('currentRetryCount').defaultTo("0")
    table.string('status').notNullable().defaultTo("requested")

  })
};

exports.down = function(knex, promise) {
  return knex.schema.dropTable('jobs')
};
