
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '@/services/api/settingsService';
import { useToast } from '@/components/ui/use-toast';

export const useNotificationPreferences = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateNotifications = useMutation({
    mutationFn: settingsService.updateNotificationPreferences,
    onSuccess: () => {
      toast({
        title: "Preferences updated",
        description: "Your notification preferences have been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "Failed to update notification preferences.",
        variant: "destructive",
      });
    },
  });

  return {
    updateNotifications: updateNotifications.mutate,
    isUpdating: updateNotifications.isPending,
  };
};

export const usePasswordChange = () => {
  const { toast } = useToast();

  const changePassword = useMutation({
    mutationFn: settingsService.changePassword,
    onSuccess: () => {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Password change failed",
        description: error.response?.data?.message || "Failed to change password.",
        variant: "destructive",
      });
    },
  });

  return {
    changePassword: changePassword.mutate,
    isChanging: changePassword.isPending,
  };
};

export const useAccountActions = () => {
  const { toast } = useToast();

  const resetData = useMutation({
    mutationFn: settingsService.resetAccountData,
    onSuccess: () => {
      toast({
        title: "Data reset",
        description: "Your account data has been reset successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Reset failed",
        description: "Failed to reset account data.",
        variant: "destructive",
      });
    },
  });

  const deleteAccount = useMutation({
    mutationFn: settingsService.deleteAccount,
    onSuccess: () => {
      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully.",
      });
      // Redirect to home page or login
      window.location.href = '/';
    },
    onError: () => {
      toast({
        title: "Delete failed",
        description: "Failed to delete account.",
        variant: "destructive",
      });
    },
  });

  return {
    resetData: resetData.mutate,
    deleteAccount: deleteAccount.mutate,
    isResetting: resetData.isPending,
    isDeleting: deleteAccount.isPending,
  };
};

export const useSessions = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: sessions, isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: settingsService.getUserSessions,
  });

  const signOutSession = useMutation({
    mutationFn: settingsService.signOutSession,
    onSuccess: () => {
      toast({
        title: "Session terminated",
        description: "You have been signed out from the selected device.",
      });
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
    onError: () => {
      toast({
        title: "Sign out failed",
        description: "Failed to terminate session.",
        variant: "destructive",
      });
    },
  });

  return {
    sessions,
    isLoading,
    signOutSession: signOutSession.mutate,
    isSigningOut: signOutSession.isPending,
  };
};
