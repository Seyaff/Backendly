import { getAllWorkspacesMutation } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useWorkspace = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: getAllWorkspacesMutation,
    staleTime: 0,
    retry: 2,
  });

  return query;
};

export default useWorkspace;
