import clientsService from "../services/clientsService.js";

const show = async (req, res, next) => {
  try {
    const clients = await clientsService.selectAll();
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await clientsService.selectById(id);
    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
};

const store = async (req, res, next) => {
  try {
    const client = req.body;

    const newClient = await clientsService.create(client);
    res.status(201).json(newClient);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedClient = req.body;
    const updatedClientResponse = await clientsService.update(
      id,
      updatedClient
    );

    res.status(200).json(updatedClientResponse);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await clientsService.remove(id);
    res.status(200).json({ message: "Client deleted" });
  } catch (error) {
    next(error);
  }
};

export default {
  store,
  show,
  index,
  update,
  remove,
};
