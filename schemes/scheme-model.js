const knex = require('knex');
const config = require('../knexfile').development;

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

const db = knex(config);

const find = () => db('schemes');

const findById = id =>
  db('schemes')
    .where({ id })
    .first();

const findSteps = id =>
  db
    .select('steps.id as id', 'scheme_name', 'step_number', 'instructions')
    .from('steps')
    .leftJoin('schemes', 'steps.scheme_id', 'schemes.id')
    .where('schemes.id', id);

const add = scheme =>
  db('schemes')
    .insert(scheme)
    .then(([id]) => findById(id));

const update = (changes, id) =>
  db('schemes')
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? findById(id) : null));

const remove = id =>
  db('schemes')
    .where({ id })
    .first()
    .then(scheme => scheme)
    .then(res => {
      db('schemes')
        .where({ id })
        .del();
      return res ? res : null;
    });
