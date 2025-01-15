import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUserUrl,
  deleteUserUrl,
  fetchUserUrls,
  updateUserUrl,
} from "../api/services/urlService";

const QUERY_KEYS = {
  fetchUserUrls: "fetchUserUrls",
  createUserUrl: "createUserUrl",
  updateUserUrl: "updateUserUrl",
  deleteUserUrl: "deleteUserUrl",
} as const;

export const useUrls = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.fetchUserUrls],
    queryFn: fetchUserUrls,
    staleTime: 3_00_000,
    refetchOnWindowFocus: false,
  });
};

export const useUrlMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.createUserUrl],
    mutationFn: createUserUrl,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fetchUserUrls] }),
  });
};

export const useUrlUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.updateUserUrl],
    mutationFn: updateUserUrl,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fetchUserUrls] }),
  });
};

export const useDeleteUrl = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.deleteUserUrl],
    mutationFn: deleteUserUrl,
    onSuccess: () => {
      console.log("on success delete");
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchUserUrls],
      });
    },
  });
};
