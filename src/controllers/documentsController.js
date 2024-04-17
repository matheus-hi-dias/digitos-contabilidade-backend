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

const show = async (req, res, next) => {
  try {
    const documents = await documentsService.selectAll();
    res.status(200).json(documents);
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const { document_code } = req.params;
    const document = await documentsService.selectByDocumentCode(document_code);
    res.status(200).json(document);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { document_code } = req.params;
    const udpatedDocument = req.body;

    const updatedDocumentResponse = await documentsService.update(
      document_code,
      udpatedDocument
    );
    res.status(200).json(updatedDocumentResponse);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { document_code } = req.params;
    await documentsService.remove(document_code);
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export default { create, show, index, update, remove };
