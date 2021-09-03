import { google } from 'googleapis';
import ggAuth from '../config/private_key.json';
const drive = google.drive('v3');

export default class GoogleApis {
  constructor() {
    this.jwtToken = new google.auth.JWT(
      ggAuth.client_email,
      null,
      ggAuth.private_key,
      ['https://www.googleapis.com/auth/drive'],
      null,
    );
  }

  authenticateGoogleDrive = async () => {
    await this.jwtToken.authorize(authErr => {
      if (authErr) {
        console.info(`error : ${authErr}`);
      } else {
        console.info('Authorization Google Drive completed');
      }
    });
  };

  createFolder = async (name, parents) => {
    const fileMetadata = {
      name,
      parents,
      mimeType: 'application/vnd.google-apps.folder',
    };
    const res = await drive.files.create({
      auth: this.jwtToken,
      resource: fileMetadata,
    });
    const id = res?.data?.id;

    this.shareFolder(id);
    return { id, name };
  };

  createFile = async (name, mimeType, body, parents) => {
    const fileMetadata = {
      name,
      parents,
    };
    const media = {
      mimeType,
      body,
    };
    const res = await drive.files.create({
      auth: this.jwtToken,
      resource: fileMetadata,
      media,
    });
    const id = res?.data?.id;
    return { id, name };
  };

  shareFolder = async fileId => {
    await drive.permissions.create({
      auth: this.jwtToken,
      resource: { type: 'anyone', role: 'reader' },
      fileId,
    });
  };

  deleteFolder = async fileId => {
    const res = await drive.files.delete({
      auth: this.jwtToken,
      fileId,
    });
    console.info('deleteFolder', res);
  }

  moveFile = async (fileId, parentId) => {
    let res = await drive.files.get({
      auth: this.jwtToken,
      fileId,
      fields: 'parents',
    });
    const previousParents = res?.data?.parents?.join(',');

    res = await drive.files.update({
      auth: this.jwtToken,
      fileId,
      addParents: parentId,
      removeParents: previousParents,
      fields: 'id, parents, name',
    });

    const id = res?.data?.id;
    const parents = res?.data?.parents;
    const name = res?.data?.name;
    return { id, parents, name };
  }

  renameFile = async (fileId, title) => {
    const res = await drive.files.update({
      auth: this.jwtToken,
      fileId,
      resource: { title },
      fields: 'id, parents, name',
    });
    const id = res?.data?.id;
    const parents = res?.data?.parents;
    const name = res?.data?.name;
    return { id, parents, name };
  }

  addPermission = async (fileId, permission = { type: 'user', role: 'reader', emailAddress: 'nhat.dao@saigontechnology.com' }) => {
    const res = await drive.permissions.create({
      auth: this.jwtToken,
      resource: permission,
      fileId,
    });
    return res?.data;
  }

  getPermissions = async fileId => {
    const res = await drive.permissions.list({
      auth: this.jwtToken,
      fileId,
    });
    return res?.data?.permissions;
  }

   deletePermission = async (fileId, permissionId) => {
     await drive.permissions.delete({
       auth: this.jwtToken,
       fileId,
       permissionId,
     });
   }
}
