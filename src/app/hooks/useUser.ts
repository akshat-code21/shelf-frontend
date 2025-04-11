import { useEffect } from "react";

import { useState } from "react";

export default function useUser() {
    const [user, setUser] = useState<{ email: string; role: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/user", {
                    method: "GET",
                    credentials: "include",
                });



                if (!res.ok) {
                    if (res.status === 401) {
                        console.log('useUser: Unauthorized (401) - No valid session');
                        setUser(null);
                        return;
                    }
                    throw new Error("Failed to fetch user data");
                }

                const data = await res.json();

                if (data && data.email && data.role) {
                    setUser(data);
                } else {
                    console.log('useUser: Invalid user data format');
                    setUser(null);
                }
            } catch (err) {
                console.error("Error in useUser:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, setUser };
}
