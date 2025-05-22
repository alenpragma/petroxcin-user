import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/src/utils/fetch/axiosConfig/axiosConfig";

const fetchData = async (dataUrl: string) => {
  const response = await axiosInstance(dataUrl);
  return response.data;
};
export const useGetData = (queryKey: any, dataUrl: string) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchData(dataUrl),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};
