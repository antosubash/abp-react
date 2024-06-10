import PublicLayout from "@/layout/public-layout";
import Login from "@/components/Login";
export default async function Home() {
  return (
    <PublicLayout>
      <h1 className="text-4xl font-bold text-center">Welcome to Acme Inc</h1>
    </PublicLayout>
  );
}
