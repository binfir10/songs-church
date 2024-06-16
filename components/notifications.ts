// utils/notifications.ts
import { useRouter } from 'next/navigation';
import { toast } from '@/components/editFomUtils';

export const useNotifications = () => {
  const router = useRouter();

  const showSuccessToast = (message: string) => {
    toast({
      title: `✅ ${message}`,
      variant: "success"
    });
  };

  const showErrorToast = (message: string) => {
    toast({
      title: `❌ Error: ${message}`,
      variant: 'destructive'
    });
  };

  const navigateTo = (path: string) => {
    router.replace(path);
    router.refresh();
  };

  return {
    showSuccessToast,
    showErrorToast,
    navigateTo
  };
};
