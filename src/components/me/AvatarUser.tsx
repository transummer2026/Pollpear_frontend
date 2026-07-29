import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useMe } from "@/hooks/user/use-me";
import { useAvatarChange } from "@/hooks/me/use-avatar-change";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import { useSWRConfig } from "swr";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UploadImageMetaSchema,
  type UploadImageMeta,
} from "@shared/schemas/uploads.schema";

export default function AvatarUser() {
  const { data: user } = useMe();

  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useAvatarChange();

  const { handleSubmit, setValue } = useForm<UploadImageMeta>({
    resolver: zodResolver(UploadImageMetaSchema),
  });

  const onInvalid: SubmitErrorHandler<UploadImageMeta> = (errors) => {
    if (errors.mimetype) toast.error("Format d'image non supporté");
    else if (errors.size) toast.error("Image trop volumineuse (max 12 Mo)");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setValue("mimetype", file.type as UploadImageMeta["mimetype"]);
    setValue("size", file.size);
    handleSubmit(async () => {
      try {
        const updated = await trigger(file);
        await mutate("/me", updated, { revalidate: false });
      } catch (err) {
        if (err instanceof ApiError) toast.error(err.message);
        else toast.error("An unknown error occurred");
      }
    }, onInvalid)();
  };

  return (
    <div className="relative h-40 w-40">
      <Avatar className="h-40 w-40 rounded-full object-cover cursor-pointer border-2">
        <AvatarImage src={user?.avatarUrl} alt="my avatar" />
        <AvatarFallback>
          {user?.username?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <form>
        <label
          aria-label="Changer l'avatar"
          className={buttonVariants({
            size: "icon",
            variant: "secondary",
            className:
              "absolute bottom-1 right-1 h-10 w-10 cursor-pointer rounded-full border-2 shadow-md",
          })}
        >
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={isMutating}
            onChange={onChange}
          />
          <Pencil className="h-4 w-4" />
        </label>
      </form>
    </div>
  );
}
