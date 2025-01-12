import { useQuery, useMutation } from "@tanstack/react-query";
import { createUserUrl, fetchUserUrls } from "../api/services/urlService";

export const useUrls = () => {
  return useQuery({
    queryKey: ["fetchUserUrls"],
    queryFn: fetchUserUrls,
    staleTime: 3_00_000,
    refetchOnWindowFocus: false,
  });
};

export const useUrlMutation = () => {
  return useMutation({
    mutationKey: ["createUrl"],
    mutationFn: createUserUrl,
  });
};
