import LoginCard from "@/components/auth/LoginCard";
import SignUpCard from "@/components/auth/SignUpCard";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        <LoginCard />
        <SignUpCard />
      </div>
    </div>
  );
}