import LoginForm from "@/components/login/Loginform";


export default function LoginPage() {
  return (
    <main
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "var(--bg-ppal)" }}
    >
      <LoginForm />
    </main>
  );
}


