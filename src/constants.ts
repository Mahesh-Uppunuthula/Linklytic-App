export const BRAND_NAME = "brand";

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
// URL_REGEX accepts with or without http://, https://, www
export const URL_REGEX =
  "^(https?:\\/\\/)?(www\\.)?[\\w\\-]+\\.[a-z]{2,}(\\.[a-z]{2,})?([\\/\\w\\-]*)*$";

export const LOCAL_APP_BASE_URL = "http://localhost:5173";
export const PRODUCTION_APP_BASE_URL = "production-app-base-url";

export const LOCAL_SERVER_BASE_URL = "http://localhost:5000";
export const PRODUCTION_SERVER_BASE_URL = "production-server-base-url";

export const SERVER_API = `${
  import.meta.env.DEV ? LOCAL_SERVER_BASE_URL : PRODUCTION_SERVER_BASE_URL
}/api/v1/urls`;
