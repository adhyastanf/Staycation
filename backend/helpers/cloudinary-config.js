import { v2 as cloudinarys } from 'cloudinary';

cloudinarys.config({
  cloud_name: 'duo3cpbxb',
  api_key: '897965363174265',
  api_secret: '51C76342VZlGOUsjNlHpYVhtCOM',
});

export const cloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinarys.uploader.upload(file, { folder }, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve({
        url: result?.secure_url,
        id: result?.public_id,
      });
    });
  });
};
