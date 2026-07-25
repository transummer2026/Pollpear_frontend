import avatar from "@/assets/pwar.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function AvatarUser() {
  return (
    <div className="relative h-40 w-40">
      <Avatar className="h-40 w-40 rounded-full object-cover cursor-pointer border-2">
        <AvatarImage src={avatar} alt="friend avatar" />
        <AvatarFallback>FA</AvatarFallback>
      </Avatar>
      <Button
        type="button"
        size="icon"
        variant="secondary"
        aria-label="Changer l'avatar"
        className="absolute bottom-1 right-1 h-10 w-10 rounded-full border-2 shadow-md"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
}


// j ai essayé de vibe codé, il me dit que le back est pas pret :( 

// import { useRef } from "react";
// import fallbackAvatar from "@/assets/pwar.jpg";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { useMe, useAvatarUpload } from "@/hooks/user/use-me";
// import { Pencil } from "lucide-react";

// export default function AvatarUser() {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const { data } = useMe();
//   const { trigger, isMutating } = useAvatarUpload();

//   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
//     try {
//       await trigger(file);
//     } finally {
//       // allow re-selecting the same file
//       event.target.value = "";
//     }
//   };

//   return (
//     <div className="relative h-40 w-40">
//       <Avatar className="h-40 w-40 rounded-full object-cover cursor-pointer border-2">
//         <AvatarImage src={data?.avatarUrl ?? fallbackAvatar} alt="user avatar" />
//         <AvatarFallback>FA</AvatarFallback>
//       </Avatar>

//       <input
//         ref={inputRef}
//         type="file"
//         accept="image/jpeg,image/png"
//         className="hidden"
//         onChange={handleFileChange}
//       />

//       <Button
//         type="button"
//         size="icon"
//         variant="secondary"
//         aria-label="Changer l'avatar"
//         disabled={isMutating}
//         onClick={() => inputRef.current?.click()}
//         className="absolute bottom-1 right-1 h-10 w-10 rounded-full border-2 shadow-md"
//       >
//         <Pencil className="h-4 w-4" />
//       </Button>
//     </div>
//   );
// }