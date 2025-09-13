import { useQuery } from "@tanstack/react-query";
import { api } from '../../api/api'

type Stats = {
  total: number;
  approved: number;
  draft: number;
  rejected: number;
};

export const useStats = () => {
  return useQuery<Stats>({
    queryKey: ["document-stats"],
    queryFn: async () => {
      const res = await api.get("/documents/stats");
      return res.data;
    },
  });
};
