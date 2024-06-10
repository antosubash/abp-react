import { useEffect, useState } from "react";
import { SessionData } from "./lib";

export default function useSession() {
    const [session, setSession] = useState<SessionData | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch('/session');
                if (response.ok) {
                    const session = await response.json() as SessionData;
                    setSession(session);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchSession();
    }, []);
    return { session, loading };
}