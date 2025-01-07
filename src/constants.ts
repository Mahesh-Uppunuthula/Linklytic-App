export const BRAND_NAME = "brand";
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
// TODO update URL_REGEX to accept more elaborate URLs.For the instance it accepts URLs like https://www.youtube.com
export const URL_REGEX =
  /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;

export const LOCAL_APP_BASE_URL = "http://localhost:5173";
export const PRODUCTION_APP_BASE_URL = "production-app-base-url";

export const LOCAL_SERVER_BASE_URL = "http://localhost:5000";
export const PRODUCTION_SERVER_BASE_URL = "production-server-base-url";

export const SERVER_API = `${
  import.meta.env.DEV ? LOCAL_SERVER_BASE_URL : PRODUCTION_SERVER_BASE_URL
}/api/v1/urls`;
