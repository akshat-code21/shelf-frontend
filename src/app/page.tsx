"use client"
import { motion, useAnimate } from 'framer-motion';
import { Book, Users, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function Home() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading state
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Book className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">BookSwap</span>
          </motion.div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => router.push('/login')}>Login</Button>
            <Button onClick={() => router.push('/signup')}>Sign Up</Button>
          </div>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold mb-6">
              Share Books,<br />
              Share Knowledge
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Join our community of book lovers. Exchange your books with others
              and discover new stories without spending a dime.
            </p>
            <Button size="lg" className="mr-4">
              Start Exchanging
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80"
              alt="Books on shelf"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <Book className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Vast Collection</h3>
            <p className="text-muted-foreground">
              Access thousands of books across various genres shared by our community members.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
            <p className="text-muted-foreground">
              Connect with fellow book enthusiasts and share recommendations.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg">
            <RefreshCw className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Exchange</h3>
            <p className="text-muted-foreground">
              Simple and secure book exchange process with local meetup options.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;