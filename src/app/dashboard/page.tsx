"use client";
import useUser from "@/app/hooks/useUser";
import OwnerDashboard from "@/components/OwnerDashboard";
import SeekerDashboard from "@/components/SeekerDashboard";
import { motion } from "framer-motion";
import { BookOpen, Loader2, Lock } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useUser();

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted/20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="mb-6 flex justify-center"
        >
          <Loader2 className="h-12 w-12 text-primary" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Loading your dashboard
          </h2>
          <p className="text-muted-foreground">Please wait a moment...</p>
        </motion.div>
      </motion.div>
    </div>
  );
  
  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted/20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <Lock className="h-12 w-12 text-muted-foreground" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-2">Unauthorized Access</h2>
          <p className="text-muted-foreground mb-6">Please log in to access your dashboard</p>
          <Link href="/" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 transition-all">
            Go to Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );

  return user.role === "ADMIN" ? <>{<OwnerDashboard />}</> : <>{<SeekerDashboard />}</>;
}
