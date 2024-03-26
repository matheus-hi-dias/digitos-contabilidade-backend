import naturezaRepository from '../repositories/naturezaRepository.js';

const indexNaturezas = async (request, response) => {
  response.json('index');
};

const showNaturezas = async (request, response) => {
  response.json('show');
};

const storeNaturezas = async (request, response) => {
  response.json('store');
};
const updateNaturezas = async (request, response) => {
  response.json('update');
};

const removeNaturezas = async (request, response) => {
  response.json('remove');
};

export default {
  indexNaturezas,
  showNaturezas,
  storeNaturezas,
  updateNaturezas,
  removeNaturezas,
};
