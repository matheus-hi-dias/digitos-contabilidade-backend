import documentsService from "../services/documentsService.js";

const create = async (req, res, next) => {
  try {
    const document = req.body;
    const newDocument = await documentsService.create(document);
    res.status(201).json(newDocument);
  } catch (error) {
    next(error);
  }
};

export default { create };
