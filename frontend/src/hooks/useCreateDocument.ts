import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";
import { toast } from "react-toastify";

export function useCreateDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { title: string; content: string }) => {
      await api.post("/documents", input);
    },
    onSuccess: () => {
      toast.success("Document create")
      queryClient.invalidateQueries({ queryKey: ["documents"] });

    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(`Error ${error.name}: ${error.message}`)
      } else {
        toast.error("Arrived at an unknown place.")
      }
    }
  });
}
