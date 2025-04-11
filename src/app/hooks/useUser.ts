import { useEffect, useState } from "react";

export default function useUser() {
    const [user, setUser] = useState<{ email: string; role: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                
                if (!res.ok) {
                    throw new Error("Unauthorized");
                }

                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error('Error in useUser:', err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
}
