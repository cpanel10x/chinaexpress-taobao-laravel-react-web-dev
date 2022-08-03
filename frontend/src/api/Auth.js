import {
  apiGet,
  apiPost,
  instance,
  instanceSetToken,
} from "../utils/AxiosInstance";
import { useMutation, useQuery } from "react-query";

export const isAuthenticated = () => {
  const isAuthenticated = window.localStorage.getItem("isAuthenticate");
  return isAuthenticated ? JSON.parse(isAuthenticated)?.login || false : false;
};

export const isBackendAuthenticated = () => {
  const access = window.localStorage.getItem("_access");
  return access ? JSON.parse(access)?.view_backend || false : false;
};

export const is_backend_authenticated = (customer) => {
  const permissions = customer.permissions || [];
  const permission = permissions.find(
    (permission) => permission.name === "view backend"
  );
  return permission?.name ? true : false;
};

export const setAuthenticated = (customer) => {
  if (customer?.id) {
    const view_backend = is_backend_authenticated(customer);
    localStorage.setItem("isAuthenticate", JSON.stringify({ login: true }));
    localStorage.setItem("_access", JSON.stringify({ view_backend }));
  } else {
    window.localStorage.removeItem("_token");
    window.localStorage.removeItem("_access");
    window.localStorage.removeItem("isAuthenticate");
  }
};

const authUserValidate = (data) => {
  const token = data?.token ? data?.token : null;
  const user = data?.user ? data?.user : data;
  instanceSetToken(token);
  setAuthenticated(user);
  return user;
};

export const useCustomer = () =>
  useQuery(["customer"], async () => {
    const data = await apiGet(`user`);
    return authUserValidate(data);
  });

export const useAuthMutation = () => {
  const customer = useCustomer();

  const checkExistsUser = useMutation(["checkExistsUser"], async (props) => {
    return await apiPost(`check-exists-customer`, props);
  });

  const registerSubmit = useMutation(["registerSubmit"], async (props) => {
    const data = await apiPost(`register-customer`, props);
    return authUserValidate(data);
  });

  const loginSubmit = useMutation(["loginSubmit"], async (props) => {
    const data = await apiPost(`login`, props);
    return authUserValidate(data);
  });

  const updateProfile = useMutation(["updateProfile"], async (props) => {
    const data = await apiPost(`update-profile`, props);
    return authUserValidate(data);
  });

  const forgotRequest = useMutation(["forgotRequest"], async (props) => {
    return await apiPost(`forgot-password`, props);
  });

  const resetRequest = useMutation(["resetRequest"], async (props) => {
    return await apiPost(`reset-password`, props);
  });

  const authLogout = async () => {
    if (customer?.data?.id) {
      await apiPost("logout");
      setAuthenticated({});
      instanceSetToken();
    }
    window.location.pathname = "/login";
  };

  return {
    customer,
    checkExistsUser,
    registerSubmit,
    loginSubmit,
    updateProfile,
    authLogout,
    forgotRequest,
    resetRequest,
  };
};

export const submitForOtpForLogin = async (formData) => {
  try {
    const { data } = await instance.post(`/submit-otp`, formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const submitForResendOtpForLogin = async (formData) => {
  try {
    const { data } = await instance.post(`/resend-otp`, formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
