import { makeError } from '../middlewares/errorHandler.js';
import documentLocalRepository from '../repositories/documentLocalRepository.js';
import documentNaturesService from './documentNaturesService.js';

const selectAll = async () => {
  const documents = await documentLocalRepository.findAll();
  const documentsFormatted = await documents.map(async (document) => {
    console.log({ document });
    return {
      id: document.id,
      local_doc: document.local_doc,
      natureza: await documentNaturesService.selectById(document.natureza_id),
    };
  });

  return documentsFormatted;
};

const selectById = async (id) => {
  const documentLocal = await documentLocalRepository.findById(id);

  if (documentLocal.length === 0) {
    throw makeError({ message: 'Local not found', status: 404 });
  }

  return documentLocal[0];
};

const create = async (local) => {
  const natureId = await documentLocalRepository.verifyNature(local.natureza);

  if (!natureId.length) {
    throw makeError({ message: 'Document nature not found', status: 400 });
  }
  const findLocalByName = await documentLocalRepository.findByName(
    local.local_doc
  );
  if (findLocalByName.length > 0) {
    throw makeError({ message: 'Document local already exists', status: 400 });
  }

  const newLocal = {
    local_doc: local.local_doc,
    natureza_id: Number(natureId[0].id),
  };

  const insertedLocal = await documentLocalRepository.create(newLocal);
  return insertedLocal[0];
};

// const update = async (cod_tipo_doc, updatedType) => {
//   if (!updatedType.tipo_doc) {
//     throw makeError({ message: 'tipo_doc is required', status: 400 });
//   }

//   const findTypeByCod = await documentTypeRepository.findDocumentTypeByCod(
//     cod_tipo_doc
//   );

//   if (findTypeByCod.length === 0) {
//     throw makeError({ message: 'Type not found', status: 404 });
//   }

//   const findTypeByName = await documentTypeRepository.findDocumentTypeByName(
//     updatedType.tipo_doc
//   );
//   if (
//     findTypeByName.length > 0 &&
//     findTypeByName.cod_tipo_doc != cod_tipo_doc
//   ) {
//     throw makeError({ message: 'Document type already exists', status: 400 });
//   }

//   const updatedTypeResponse = await documentTypeRepository.update(
//     cod_tipo_doc,
//     updatedType
//   );

//   return updatedTypeResponse[0];
// };

// const remove = async (type_cod) => {
//   const docType = await documentTypeRepository.deleteDocumentType(type_cod);
//   if (!docType) {
//     throw makeError({ message: 'Type not found', status: 404 });
//   }
// };

export default {
  selectAll,
  selectById,
  create,
  // update,
  // remove,
};
