export const BASE_URL = 'https://b5g5gdwc99.execute-api.sa-east-1.amazonaws.com';

export enum StorageEnum {
  authStorageKey = 'zapbuy:auth',
  profileStorageKey = 'zapbuy:profile',
  storesStorageKey = 'zapbuy:stores',
  productsStorageKey = 'zapbuy:products',
}

export enum AuthEnum {
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{10,}$'
}
