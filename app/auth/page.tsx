import AuthForm from "@/components/form/auth-form";

export default function SignInPage() {
  return (
    <div className="mx-2 flex h-[calc(80vh-6.5rem)] items-center justify-center bg-gray-100 md:h-auto">
      <AuthForm />
    </div>
  );
}
