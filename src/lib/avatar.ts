import defaultAvatar1 from "@/assets/avatars/default-1.svg";
import defaultAvatar2 from "@/assets/avatars/default-2.svg";
import defaultAvatar3 from "@/assets/avatars/default-3.svg";
import defaultAvatar4 from "@/assets/avatars/default-4.svg";

/** Ce que le back stocke tant que l'utilisateur n'a pas uploade d'avatar. */
const BACKEND_DEFAULT_AVATAR = "/uploads/avatars/default.svg";

/**
 * Repartition des poires par initiale du prenom : A-G, H-N, O-T, puis tout le
 * reste (U-Z, chiffres, caracteres speciaux, prenom absent).
 */
const DEFAULT_AVATAR_BY_INITIAL: ReadonlyArray<{
  upTo: string;
  avatar: string;
}> = [
  { upTo: "G", avatar: defaultAvatar1 },
  { upTo: "N", avatar: defaultAvatar2 },
  { upTo: "T", avatar: defaultAvatar3 },
];

function defaultAvatarFor(name?: string | null): string {
  // Les accents sont retires pour que "Elodie" et "Elodie" tombent sur la
  // meme poire, sinon "E" accentue sortirait de l'intervalle A-Z.
  const initial = (name ?? "")
    .trim()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .charAt(0)
    .toUpperCase();

  if (initial >= "A" && initial <= "Z") {
    const match = DEFAULT_AVATAR_BY_INITIAL.find(({ upTo }) => initial <= upTo);
    if (match) return match.avatar;
  }
  return defaultAvatar4;
}

/**
 * Rend l'avatar a afficher : la poire derivee du prenom uniquement quand la
 * base contient exactement l'image generique du back, sinon ce que la base
 * contient (y compris rien du tout, l'Avatar retombe alors sur les initiales).
 */
export function resolveAvatarUrl(
  avatarUrl: string | null | undefined,
  name?: string | null,
): string | undefined {
  if (avatarUrl === BACKEND_DEFAULT_AVATAR) return defaultAvatarFor(name);
  return avatarUrl ?? undefined;
}
