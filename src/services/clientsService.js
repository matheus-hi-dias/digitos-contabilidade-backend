import { makeError } from "../middlewares/errorHandler.js";
import clientRepository from "../repositories/clientRepository.js";

const create = async (client) => {
  const newClient = { ...client };
  if (!newClient.name) {
    throw makeError({ message: "name is required", status: 400 });
  }
  if (!newClient.personType) {
    throw makeError({ message: "personType is required", status: 400 });
  }
  if (!newClient.cpfCnpj) {
    throw makeError({ message: "cpfCnpj is required", status: 400 });
  }

  if (typeof newClient.cpfCnpj !== "string") {
    throw makeError({ message: "cpfCnpj must be a string", status: 400 });
  }

  if (newClient.personType !== "F" && newClient.personType !== "J") {
    throw makeError({ message: "personType must be 'F' or 'J'", status: 400 });
  }

  newClient.personType = newClient.personType.toUpperCase();

  if (newClient.personType === "F" && newClient.cpfCnpj.length !== 11) {
    throw makeError({ message: "cpf must have 11 characters", status: 400 });
  }

  if (newClient.personType === "J" && newClient.cpfCnpj.length !== 14) {
    throw makeError({ message: "cnpj must have 14 characters", status: 400 });
  }

  const cpfCnpjExists = await clientRepository.verifyCpfCnpj(newClient.cpfCnpj);
  if (cpfCnpjExists.length > 0) {
    throw makeError({ message: "cpfCnpj already in use", status: 400 });
  }

  const newClientResult = await clientRepository.create(newClient);
  return newClientResult[0];
};

const selectAll = async () => {
  return await clientRepository.findAll();
};

const selectById = async (id) => {
  const client = await clientRepository.findById(id);

  if (client.length === 0) {
    throw makeError({ message: "Client not found", status: 404 });
  }

  return client[0];
};

const update = async (id, updatedClient) => {
  const updatedClientData = { ...updatedClient };
  if (!updatedClientData.name) {
    throw makeError({ message: "name is required", status: 400 });
  }
  if (!updatedClientData.personType) {
    throw makeError({ message: "personType is required", status: 400 });
  }
  if (!updatedClientData.cpfCnpj) {
    throw makeError({ message: "cpfCnpj is required", status: 400 });
  }

  if (typeof updatedClientData.cpfCnpj !== "string") {
    throw makeError({ message: "cpfCnpj must be a string", status: 400 });
  }

  if (
    updatedClientData.personType !== "F" &&
    updatedClientData.personType !== "J"
  ) {
    throw makeError({ message: "personType must be 'F' or 'J'", status: 400 });
  }

  updatedClientData.personType = updatedClientData.personType.toUpperCase();

  if (
    updatedClientData.personType === "F" &&
    updatedClientData.cpfCnpj.length !== 11
  ) {
    throw makeError({ message: "cpf must have 11 characters", status: 400 });
  }

  if (
    updatedClientData.personType === "J" &&
    updatedClientData.cpfCnpj.length !== 14
  ) {
    throw makeError({ message: "cnpj must have 14 characters", status: 400 });
  }

  const cpfCnpjExists = await clientRepository.verifyCpfCnpj(
    updatedClientData.cpfCnpj
  );
  if (cpfCnpjExists.length > 0 && cpfCnpjExists[0].id != id) {
    throw makeError({ message: "cpfCnpj already in use", status: 400 });
  }

  const updatedClientResponse = await clientRepository.update(
    id,
    updatedClientData
  );
  return updatedClientResponse[0];
};

const remove = async (id) => {
  const client = await clientRepository.deleteClient(id);
  if (!client) {
    throw makeError({ message: "Client not found", status: 404 });
  }
};

export default {
  create,
  selectAll,
  selectById,
  update,
  remove,
};
