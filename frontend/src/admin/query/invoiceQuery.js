import { useQuery } from "react-query";
import { apiGet } from "../../utils/AxiosInstance";



const useInvoice = (query) => {

    const list = useQuery(["invoice_list", query], async () => {
        const resData = await apiGet(`admin/order/invoice`, query);
        return resData ? resData : {};
    });

    return {
        list
    }
}

export default useInvoice