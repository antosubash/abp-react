import PublicLayout from "@/layout/public-layout";
import Login from "@/components/Login";
export default async function Home() {
  return (
    <PublicLayout>
      <Login />
    </PublicLayout>
  );
}
