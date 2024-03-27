import documentTypesService from '../documentTypesService.js';
import documentTypeRepository from '../../repositories/documentTypeRepository.js';

jest.mock('../../middlewares/errorHandler.js', () => ({
  makeError: jest.fn(({ message, status }) => ({ message, status })),
}));

describe('documentTypesService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('selectAll', () => {
    it('should return all document types', async () => {
      const expectedTypes = [
        { id: 1, tipo_doc: 'Type A' },
        { id: 2, tipo_doc: 'Type B' },
      ];
      const findAllSpy = jest
        .spyOn(documentTypeRepository, 'findAll')
        .mockResolvedValue(expectedTypes);

      const types = await documentTypesService.selectAll();

      expect(types).toEqual(expectedTypes);
      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('selectByCod', () => {
    it('should return document type with specified code', async () => {
      const expectedType = { id: 1, tipo_doc: 'Type A' };
      const findDocumentTypeByCodSpy = jest
        .spyOn(documentTypeRepository, 'findDocumentTypeByCod')
        .mockResolvedValue([expectedType]);

      const type = await documentTypesService.selectByCod(1);

      expect(type).toEqual(expectedType);
      expect(findDocumentTypeByCodSpy).toHaveBeenCalledWith(1);
    });

    it('should throw error when document type with specified code is not found', async () => {
      jest
        .spyOn(documentTypeRepository, 'findDocumentTypeByCod')
        .mockResolvedValue([]);

      await expect(documentTypesService.selectByCod(999)).rejects.toEqual({
        message: 'Type not found',
        status: 404,
      });
    });
  });

  describe('create', () => {
    it('should create a new document type', async () => {
      const newType = { cod_tipo_doc: 3, tipo_doc: 'Type C' };
      jest
        .spyOn(documentTypeRepository, 'findDocumentTypeByCod')
        .mockResolvedValue([]);
      jest
        .spyOn(documentTypeRepository, 'findDocumentTypeByName')
        .mockResolvedValue([]);
      const createSpy = jest
        .spyOn(documentTypeRepository, 'create')
        .mockResolvedValue([newType]);

      const createdType = await documentTypesService.create(newType);

      expect(createdType).toEqual(newType);
      expect(createSpy).toHaveBeenCalledWith(newType);
    });

    it('should throw error when cod_tipo_doc already exists', async () => {
      jest
        .spyOn(documentTypeRepository, 'findDocumentTypeByCod')
        .mockResolvedValue([{ id: 1, tipo_doc: 'Type A' }]);

      await expect(
        documentTypesService.create({ cod_tipo_doc: 1, tipo_doc: 'Type A' })
      ).rejects.toEqual({
        message: 'Document type code already exists',
        status: 400,
      });
    });

    it('should throw error when tipo_doc already exists', async () => {
      jest
        .spyOn(documentTypeRepository, 'findDocumentTypeByCod')
        .mockResolvedValue([]);
      jest
        .spyOn(documentTypeRepository, 'findDocumentTypeByName')
        .mockResolvedValue([{ id: 1, tipo_doc: 'Type A' }]);

      await expect(
        documentTypesService.create({ cod_tipo_doc: 3, tipo_doc: 'Type A' })
      ).rejects.toEqual({
        message: 'Document type already exists',
        status: 400,
      });
    });

    it('should throw error when cod_tipo_doc is missing', async () => {
      await expect(
        documentTypesService.create({ tipo_doc: 'Type C' })
      ).rejects.toEqual({
        message: 'cod_tipo_doc is required',
        status: 400,
      });
    });
  });

  describe('update', () => {
    it('should update an existing document type', async () => {
      const updatedType = { tipo_doc: 'Updated Type' };
      jest
        .spyOn(documentTypeRepository, 'findDocumentTypeByCod')
        .mockResolvedValue([{ id: 1, tipo_doc: 'Type A' }]);
      jest
        .spyOn(documentTypeRepository, 'findDocumentTypeByName')
        .mockResolvedValue([]);
      const updateSpy = jest
        .spyOn(documentTypeRepository, 'update')
        .mockResolvedValue([{ id: 1, tipo_doc: 'Updated Type' }]);

      const updated = await documentTypesService.update(1, updatedType);

      expect(updated).toEqual({ id: 1, tipo_doc: 'Updated Type' });
      expect(updateSpy).toHaveBeenCalledWith(1, updatedType);
    });

    it('should throw error when document type with specified code is not found', async () => {
      jest
        .spyOn(documentTypeRepository, 'findDocumentTypeByCod')
        .mockResolvedValue([]);

      await expect(
        documentTypesService.update(999, { tipo_doc: 'Updated Type' })
      ).rejects.toEqual({
        message: 'Type not found',
        status: 404,
      });
    });

    it('should throw error when tipo_doc already exists', async () => {
      jest
        .spyOn(documentTypeRepository, 'findDocumentTypeByCod')
        .mockResolvedValue([{ id: 1, tipo_doc: 'Type A' }]);
      jest
        .spyOn(documentTypeRepository, 'findDocumentTypeByName')
        .mockResolvedValue([{ id: 2, tipo_doc: 'Type B' }]);

      await expect(
        documentTypesService.update(1, { tipo_doc: 'Type B' })
      ).rejects.toEqual({
        message: 'Document type already exists',
        status: 400,
      });
    });

    it('should throw error when tipo_doc is missing', async () => {
      jest
        .spyOn(documentTypeRepository, 'findDocumentTypeByCod')
        .mockResolvedValue([{ id: 1, tipo_doc: 'Type A' }]);

      await expect(documentTypesService.update(1, {})).rejects.toEqual({
        message: 'tipo_doc is required',
        status: 400,
      });
    });
  });

  describe('remove', () => {
    it('should remove a document type', async () => {
      const deleteDocumentTypeSpy = jest
        .spyOn(documentTypeRepository, 'deleteDocumentType')
        .mockResolvedValue(true);

      await documentTypesService.remove(1);

      expect(deleteDocumentTypeSpy).toHaveBeenCalledWith(1);
    });

    it('should throw error when document type with specified code is not found', async () => {
      jest
        .spyOn(documentTypeRepository, 'deleteDocumentType')
        .mockResolvedValue(false);

      await expect(documentTypesService.remove(999)).rejects.toMatchObject({
        message: 'Type not found',
        status: 404,
      });
    });
  });
});
