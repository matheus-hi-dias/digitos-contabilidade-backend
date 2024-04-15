import clientsService from "../services/clientsService.js"

const store = async (request, response, next) => {
  try {
    const client = request.body;

    const newClient = await clientsService.create(client);
    response.status(201).json(newClient);
  } catch (error) {
    next(error)
  }
}

export default {
  store
}
