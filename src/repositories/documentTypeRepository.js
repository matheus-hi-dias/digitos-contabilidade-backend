import knex from 'knex';
import knexConfig from '../../knexfile.js';

const knexInstance = knex(knexConfig);

const findAll = async () => {
  return await knexInstance('tipo_doc').select('*');
};

const findDocumentTypeByCod = async (documentCod) => {
  return await knexInstance('tipo_doc')
    .select('*')
    .where('cod_tipo_doc', documentCod);
};

const findDocumentTypeByName = async (tipo_doc) => {
  return await knexInstance('tipo_doc').select('*').where('tipo_doc', tipo_doc);
};

const create = async (type) => {
  return await knexInstance('tipo_doc').insert(type).returning('*');
};

const update = async (cod_tipo_doc, type) => {
  return await knexInstance('tipo_doc')
    .update(type)
    .where('cod_tipo_doc', cod_tipo_doc)
    .returning('*');
};

const deleteDocumentType = async (cod_tipo_doc) => {
  return await knexInstance('tipo_doc')
    .delete()
    .where('cod_tipo_doc', cod_tipo_doc);
};

export default {
  findAll,
  findDocumentTypeByCod,
  findDocumentTypeByName,
  create,
  update,
  deleteDocumentType,
};
