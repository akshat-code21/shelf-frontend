"use client";
import useUser from "@/app/hooks/useUser";
import OwnerDashboard from "@/components/OwnerDashboard";
import SeekerDashboard from "@/components/SeekerDashboard";

export default function DashboardPage() {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Unauthorized. Please log in.</p>;

  return user.role === "OWNER" ? <OwnerDashboard /> : <SeekerDashboard />;
}
