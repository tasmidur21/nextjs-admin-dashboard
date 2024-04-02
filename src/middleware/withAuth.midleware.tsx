import { useAppConfig } from '@/contexts/ApplicationConfigContext';
import { useRouter } from 'next/router';

export default function withAuth(Component:any) {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const { appConfig } = useAppConfig();

    if (!appConfig.auth) return <div>Loading...</div>;
    if (!appConfig.auth?.isAuthenticated) {
      router.push('/auth/sign-in');
      return null;
    }
    return <Component {...props} />;
  };
}
