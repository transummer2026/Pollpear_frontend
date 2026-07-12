import avatar from "@/assets/pwar.jpg";

export default function AvatarUser() {
	return (
      <img
        src={avatar}
        alt="Avatar"
        className="h-40 w-40 rounded-full object-cover cursor-pointer border-2"
      />
  )
}