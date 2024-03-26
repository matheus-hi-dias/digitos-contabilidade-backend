import documentNaturesService from '../documentNaturesService';
import documentNatureRepository from '../../repositories/documentNatureRepository';

jest.mock('../../repositories/documentNatureRepository', () => ({
  findAllNatures: jest.fn(),
  findNatureById: jest.fn(),
  findNatureByName: jest.fn(),
  createNature: jest.fn(),
  udpateNature: jest.fn(),
  deleteNature: jest.fn(),
}));

describe('documentNaturesService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('selectAll', () => {
    it('should return all document natures', async () => {
      const mockedNatures = [{ id: 1, natureza: 'Nature 1' }, { id: 2, natureza: 'Nature 2' }];
      documentNatureRepository.findAllNatures.mockResolvedValue(mockedNatures);

      const result = await documentNaturesService.selectAll();

      expect(result).toEqual(mockedNatures);
      expect(documentNatureRepository.findAllNatures).toHaveBeenCalledTimes(1);
    });
  });

  describe('selectById', () => {
    it('should return the document nature for a valid id', async () => {
      const id = 1;
      const mockedNature = { id: 1, natureza: 'Nature 1' };
      documentNatureRepository.findNatureById.mockResolvedValue([mockedNature]);

      const result = await documentNaturesService.selectById(id);

      expect(result).toEqual(mockedNature);
      expect(documentNatureRepository.findNatureById).toHaveBeenCalledWith(id);
    });

    it('should throw an error for an invalid id', async () => {
      const id = 999;
      const mockError = new Error('Nature not found');
      jest.spyOn(documentNatureRepository, 'findNatureById').mockRejectedValueOnce(mockError);
    
      await expect(documentNaturesService.selectById(id)).rejects.toThrow(mockError.message);
    });
  });

  describe('create', () => {
    it('should create a new document nature', async () => {
      const newNature = { natureza: 'New Nature' };
      const createdNature = { id: 3, natureza: 'New Nature' };
      documentNatureRepository.findNatureByName.mockResolvedValue([]);
      documentNatureRepository.createNature.mockResolvedValue([createdNature]);

      const result = await documentNaturesService.create(newNature);

      expect(result).toEqual(createdNature);
      expect(documentNatureRepository.findNatureByName).toHaveBeenCalledWith(newNature.natureza);
      expect(documentNatureRepository.createNature).toHaveBeenCalledWith(newNature);
    });

    it('should throw an error if nature already exists', async () => {
      const existingNature = { natureza: 'Existing Nature' };
      const mockError = { message: 'Nature already exists', status: 400 };
      jest.spyOn(documentNatureRepository, 'findNatureByName').mockResolvedValueOnce([existingNature]);
  
      await expect(documentNaturesService.create(existingNature)).rejects.toEqual(mockError);
    });

    it('should throw an error if nature is not provided', async () => {
      const invalidNature = {};
      const mockError = { message: 'Nature is required', status: 400 };
  
      await expect(documentNaturesService.create(invalidNature)).rejects.toEqual(mockError);
    });
  });

  describe('update', () => {
    it('should update an existing document nature', async () => {
      const id = 1;
      const updatedNature = { id: 1, natureza: 'Updated Nature' };
      documentNatureRepository.findNatureByName.mockResolvedValue([]);
      documentNatureRepository.findNatureById.mockResolvedValue([updatedNature]);
      documentNatureRepository.udpateNature.mockResolvedValue([updatedNature]);

      const result = await documentNaturesService.update(id, updatedNature);

      expect(result).toEqual(updatedNature);
      expect(documentNatureRepository.findNatureByName).toHaveBeenCalledWith(updatedNature.natureza);
      expect(documentNatureRepository.udpateNature).toHaveBeenCalledWith(id, updatedNature);
    });

    it('should throw an error if nature already exists with different id', async () => {
      const id = 1;
      const updatedNature = { id: 2, natureza: 'Existing Nature' };
      const existingNature = { id: 3, natureza: 'Existing Nature' };
      const mockError = { message: 'Nature already exists', status: 400 };
      jest.spyOn(documentNatureRepository, 'findNatureByName').mockResolvedValueOnce([existingNature]);
  
      await expect(documentNaturesService.update(id, updatedNature)).rejects.toEqual(mockError);
    });
  
    it('should throw an error if nature is not provided', async () => {
      const id = 1;
      const invalidNature = {};
      const mockError = { message: 'Nature is required', status: 400 };
  
      await expect(documentNaturesService.update(id, invalidNature)).rejects.toEqual(mockError);
    });
  });

  describe('remove', () => {
    it('should remove a document nature for a valid id', async () => {
      const id = 1;
      documentNatureRepository.deleteNature.mockResolvedValue({});

      await documentNaturesService.remove(id);

      expect(documentNatureRepository.deleteNature).toHaveBeenCalledWith(id);
    });

    it('should throw an error for an invalid id', async () => {
      const id = 999;
      const mockError = { message: "This nature doesn't exist", status: 400 };
      jest.spyOn(documentNatureRepository, 'deleteNature').mockResolvedValueOnce(null);
  
      await expect(documentNaturesService.remove(id)).rejects.toEqual(mockError);
    });
  });
});
