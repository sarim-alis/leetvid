import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserInfoProps {
  user: {
    name?: string;
    image?: string;
    clerkId: string;
    email?: string;
  };
}

export default function UserInfo({ user }: UserInfoProps) {
  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("") || user.email?.slice(0, 2) || "U";

  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-6">
        <AvatarImage src={user.image} alt={user.name || user.email || "User"} />
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">
        {user.name || user.email || "Unknown User"}
      </span>
    </div>
  );
}
