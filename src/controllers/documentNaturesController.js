import documentNaturesService from '../services/documentNaturesService.js';

const index = async (request, response, next) => {
  try {
    const natures = await documentNaturesService.selectAll();
    response.status(200).json(natures);
  } catch (error) { 
    next(error)
  }
};

const show = async (request, response, next) => {
  try {
    const { id } = request.params;
    const nature = await documentNaturesService.selectById(id);  
    return response.status(200).json(nature);
  } catch (error) {
    next(error)
  }
};

const store = async (request, response, next) => {
  try{
    const nature = request.body;
  
    const newNature = await documentNaturesService.create(nature);
    response.status(201).json(newNature);

  } catch (error) {
    next(error)
  }
};

const update = async (request, response, next) => {
  try {
    const { id } = request.params;
  
    const updatedNature = request.body;
  
    const updateNatureResponse = await documentNaturesService.update(id, updatedNature);
  
    response.status(200).json(updateNatureResponse);
  } catch (error) {
    next(error)
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;
    await documentNaturesService.remove(id);
    response.status(200).json({message: 'Nature deleted'});
  } catch (error) {
    next(error);
  }
};

export default {
  index,
  show,
  store,
  update,
  remove,
};
