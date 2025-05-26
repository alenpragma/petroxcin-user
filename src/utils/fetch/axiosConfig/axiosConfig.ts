import LogoutPage from "@/src/app/logout/page";
import axios from "axios";
import Cookies from "js-cookie";

export type IGenericErrorResponse = {
  statusCode?: number;
  message?: string;
  success?: string;
  errorMessages?: IGenericErrorMessage[];
};
export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

const axiosInstance = axios.create({
  baseURL: `https://api.petroxcin.com/api/user`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("petroxcinToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function (response): any {
    const responseObject: any = {
      data: response?.data,
      status: response?.status,
      success: response?.data?.success,
    };
    return responseObject;
  },
  (error) => {
    console.log(error.response.status);
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      window.location.href = "/logout";
    }
    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.status || 500,
      message: error?.response?.data || "Something went wrong",
      success: error?.response?.data?.success,
    };
    // return responseObject;
    return Promise.reject(responseObject);
  }
);

export default axiosInstance;
