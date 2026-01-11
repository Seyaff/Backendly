import { logoutMutationFn } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutMutationFn,
    onSuccess: (response) => {
      queryClient.clear();
      toast("Logged out", {
        description: response.message,
      });
      navigate("/sign-in", { replace: true });
    },
  });
};

export default useLogout;
