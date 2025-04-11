import { Book } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
export default function Navbar() {
    return (
        <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 ml-12"
                >
                    <Link href="/" className="flex items-center gap-2"  >
                        <Book className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold tracking-tight">BookSwap</span>
                    </Link>
                </motion.div>
            </div>
        </nav>
    )
}