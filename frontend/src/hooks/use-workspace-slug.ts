import { useParams } from "react-router-dom";

const useWorkspaceSlug = () => {
  const params = useParams();
  return params.workspaceId as string;
};

export default useWorkspaceSlug;
