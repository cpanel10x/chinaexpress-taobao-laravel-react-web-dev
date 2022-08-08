import {useMutation, useQuery} from "react-query";
import {apiDelete, apiGet, apiPost, apiUpdate, instance} from "../../utils/AxiosInstance";
import {setGetToken} from "../../api/CartApi";

export const useWalletData = (query) =>
  useQuery(["wallet", query], async () => {
    const resData = await apiGet(`admin/order/wallet?${query}`);
    return resData ? resData : {results: [], totalCount: 0};
  });

export const useWalletUpdateStatus = () =>
  useMutation("useWalletUpdateStatus", async (props) => {
    const resData = await apiPost(`admin/order/wallet`, props);
    return resData ? resData : {results: [], totalCount: 0};
  });

export const useWalletMasterUpdate = (id) =>
  useMutation(["useWalletMasterUpdate", id], async (props) => {
    const resData = await apiUpdate(`admin/order/wallet/${id}`, props);
    return resData ? resData : {results: [], totalCount: 0};
  });

export const useWalletBatchDelete = () =>
  useMutation(["useWalletBatchDelete"], async (props) => {
    const resData = await apiDelete(`admin/order/wallet/delete`, props);
    return resData ? resData : {results: [], totalCount: 0};
  });

export const useWalletTrackingInfo = (id) =>
  useQuery(["tracking_info", id], async () => {
    const resData = await apiGet(`admin/order/wallet/tracking/${id}`);
    return resData ? resData.tracking : [];
  });
