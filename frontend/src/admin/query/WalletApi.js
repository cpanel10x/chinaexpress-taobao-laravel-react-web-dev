import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiGet } from "../../utils/AxiosInstance";

export const useWalletData = (query) =>
  useQuery(["wallet", query], async () => {
    const resData = await apiGet(`admin/order/wallet?${query}`);

    return resData ? resData : { results: [], totalCount: 0 };
  });
