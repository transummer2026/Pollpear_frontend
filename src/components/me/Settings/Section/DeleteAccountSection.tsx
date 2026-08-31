import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ApiError } from "@/lib/fetcher";
import { useMeDelete } from "@/hooks/user/use-me";
import {
  DELETE_ACCOUNT_CONFIRMATION_PHRASE,
  type UserDeleteDTO,
  UserDeleteSchema,
} from "@shared/schemas/auth.schema";

/**
 * Account deletion, behind a confirmation that asks for both the password and a
 * typed phrase — the shared schema checks the phrase, so the wording is the
 * same one the backend expects.
 *
 * On success the `/me` cache is emptied before navigating: leaving the old user
 * in it would let the guarded routes believe the session is still alive.
 */
export default function DeleteAccountSection() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useMeDelete();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserDeleteDTO>({
    resolver: zodResolver(UserDeleteSchema),
  });

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) reset();
  };

  const onSubmit: SubmitHandler<UserDeleteDTO> = async (data) => {
    try {
      await trigger(data);
      await mutate("/me", null, { revalidate: false });
      setOpen(false);
      navigate("/auth/login", { replace: true });
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl text-destructive">
          Delete account
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This will permanently delete your account and all of its data. This
          action cannot be undone.
        </p>

        <AlertDialog open={open} onOpenChange={handleOpenChange}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete my account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action is permanent and cannot be undone. Type{" "}
                  <strong>{DELETE_ACCOUNT_CONFIRMATION_PHRASE}</strong> below to
                  confirm.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="my-4">
                <Input
                  type="text"
                  placeholder={DELETE_ACCOUNT_CONFIRMATION_PHRASE}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  {...register("confirmation")}
                />
                {errors.confirmation && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.confirmation.message}
                  </p>
                )}
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={isMutating}
                >
                  Delete my account
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </>
  );
}
