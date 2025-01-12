import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return; // Esperar a que se cargue la sesión
        
        if (!session) {
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath },
            });
        }
    }, [session, status, router]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return session ? <>{children}</> : null;
};

export default ProtectedRoute; 