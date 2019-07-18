const knex = require('knex');
const config = require('../knexfile').development;

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

const remove = async id => {
  const deleted = await findById(id);
  const count = await db('schemes')
    .where('id', deleted.id)
    .del();
  return count > 0 ? deleted : null;
};

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};
