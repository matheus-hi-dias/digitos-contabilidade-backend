import { makeError } from "../middlewares/errorHandler.js"
import clientRepository from "../repositories/clientRepository.js"

const create = async (client) => {
  const newClient = {...client}
  if (!newClient.name) {
    console.log('sem name')
    throw makeError({message: "name is required", status: 400});
  }
  if (!newClient.personType) {
    throw makeError({message: "personType is required", status: 400});
  }
  if (!newClient.cpfCnpj) {
    throw makeError({message: "cpfCnpj is required", status: 400});
  }

  if (typeof newClient.cpfCnpj !== "string") {
    throw makeError({message: "cpfCnpj must be a string", status: 400});
  }

  if (newClient.personType !== "F" && client.personType !== "J") {
    throw makeError({message: "personType must be 'F' or 'J'", status: 400});
  }

  newClient.personType = newClient.personType.toUpperCase();


  if (client.personType === "F" && client.cpfCnpj.length !== 11) {
    throw makeError({message: "cpf must have 11 characters", status: 400});
  }

  if (client.personType === "J" && client.cpfCnpj.length !== 14) {
    throw makeError({message: "cnpj must have 14 characters", status: 400});
  }

  const cpfCnpjExists = await clientRepository.verifyCpfCnpj(client.cpfCnpj);
  if (cpfCnpjExists.length > 0) {
    throw makeError({message: "cpfCnpj already in use", status: 400});
  }

  const newClientResult = await clientRepository.create(newClient);
  return newClientResult[0];
}

export default {
  create
}
