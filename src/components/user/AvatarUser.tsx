import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/user/use-user";

type AvatarUserProps = {
  id: number;
};

//TODO: mettre la pastille verte ou grise en fonction de si ils sont connecté ou pas
export default function AvatarUser({ id }: AvatarUserProps) {
  const { data: user } = useUser(id);

  return (
    <div className="relative h-40 w-40">
      <Avatar className="h-40 w-40 rounded-full object-cover border-2">
        <AvatarImage src={user?.avatarUrl} alt={`${user?.username} avatar`} />
        <AvatarFallback>
          {user?.username?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
