import { useMutation, useQuery } from "react-query";
import { apiGet, apiPost, instance } from "../../utils/AxiosInstance";
import { setGetToken } from "../../api/CartApi";

export const useWalletData = (query) =>
  useQuery(["wallet", query], async () => {
    const resData = await apiGet(`admin/order/wallet?${query}`);
    return resData ? resData : { results: [], totalCount: 0 };
  });

export const useWalletUpdateStatus = () =>
  useMutation("useWalletUpdateStatus", async (props) => {
    const resData = await apiPost(`admin/order/wallet`, props);
    return resData ? resData : { results: [], totalCount: 0 };
  });

export const useWalletTrackingInfo = (id) =>
  useQuery(["tracking_info", id], async () => {
    const resData = await apiGet(`admin/order/wallet/tracking/${id}`);
    return resData ? resData.tracking : [];
  });
