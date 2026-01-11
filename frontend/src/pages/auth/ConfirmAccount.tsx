import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { verifyEmailMutationFn } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Loader } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const ConfirmAccount = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmailMutationFn,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!code) {
      toast("Error", {
        description: "Confirmation token not found",
      });
      return;
    }

    mutate(
      { code },
      {
        onSuccess: (response) => {
          toast("Success" , {
            description : response.message
          })
          navigate("/dashboard")
        },
        onError: (error) => {
          const err = error as AxiosError<any>
          toast("Error" , {
            description : err?.response?.data.message
          })
        },
      }
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div
        className="
          w-full max-w-md 
          bg-background 
          rounded-xl 
          border 
          shadow-sm 
          p-6 sm:p-8
        "
      >
        {/* Logo */}
        <div className="flex justify-center sm:justify-start mb-6">
          <Logo />
        </div>

        {/* Heading */}
        <h1 className="text-xl font-bold text-center sm:text-left mb-2">
          Account confirmation
        </h1>

        <p className="text-sm text-muted-foreground text-center sm:text-left mb-6">
          To confirm your account, please follow the button below.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Button
            disabled={isPending}
            type="submit"
            className="w-full h-10 text-sm font-semibold"
          >
            {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Confirm account
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-xs text-muted-foreground text-center">
          If you have any issues confirming your account, contact{" "}
          <a
            href="mailto:support@backendly.com"
            className="text-primary hover:underline"
          >
            support@backendly.com
          </a>
        </p>
      </div>
    </main>
  );
};

export default ConfirmAccount;
