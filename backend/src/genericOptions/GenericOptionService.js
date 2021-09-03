import dependencyNames from '../constants/dependencyNames';
import GenericOptionDTO from './GenericOptionDTO';

export default class GenericOptionService {
  constructor(beans) {
    this.genericOptionRepository = beans[dependencyNames.genericOptionRepository];
    this.googleApis = beans[dependencyNames.googleApis];
  }

  updateGoogleDriveIDsOfTypes = async () => {
    const where = { group: 'type' };
    const attributes = ['id', 'name', 'googleDriveFolderId'];
    let types = await this.genericOptionRepository.findAll(where, attributes);

    // create folder for types
    let promises = types
      .filter(type => !type.googleDriveFolderId)
      .map(type => this.googleApis.createFolder(type.name, [process.env.GOOGLE_DRIVE_ROOT_FOLDER]));

    const folders = await Promise.all(promises);
    promises = folders.map(folder => this.genericOptionRepository.updateOne({ name: folder.name }, { googleDriveFolderId: folder.id }));
    await Promise.all(promises);

    // create folder for subtypes
    types = await this.genericOptionRepository.findAll(where, attributes);
    promises = types.map(type => this.updateGoogleDriveIDsOfSubTypes(type));
    await Promise.all(promises);
  }

  updateGoogleDriveIDsOfSubTypes = async parentType => {
    const { id, googleDriveFolderId } = parentType;
    const where = { group: 'subType', parentId: id };
    const attributes = ['id', 'name', 'googleDriveFolderId'];
    const subTypes = await this.genericOptionRepository.findAll(where, attributes);

    // create folder for sub-types
    let promises = subTypes
      .filter(type => !type.googleDriveFolderId)
      .map(subType => {
        const parents = [googleDriveFolderId];
        return this.googleApis.createFolder(subType.name, parents);
      });

    const folders = await Promise.all(promises);
    promises = folders.map(folder => this.genericOptionRepository.updateOne({ name: folder.name }, { googleDriveFolderId: folder.id }));
    await Promise.all(promises);
  }

  getGenericOptions = async (group, parentId) => {
    const where = {};
    if (parentId) where.parentId = parentId;
    if (group) where.group = group;

    const attributes = ['id', 'name', 'group', 'parentId'];
    const include = ['parent'];

    let genericOptions = await this.genericOptionRepository.findAll(where, attributes, include);
    genericOptions = genericOptions.map(genOpt => new GenericOptionDTO(genOpt).toJSON());

    return genericOptions;
  };

  getGoogleDriveParentId = async typeId => {
    const where = { id: typeId };
    const attributes = ['googleDriveFolderId'];

    const genericOption = await this.genericOptionRepository.findOne(where, attributes);
    const googleDriveParentIds = [genericOption?.googleDriveFolderId];

    return googleDriveParentIds;
  };
}
