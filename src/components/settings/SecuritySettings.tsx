
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { usePasswordChange, useSessions } from '@/hooks/useSettings';

const SecuritySettings = () => {
  const { changePassword, isChanging } = usePasswordChange();
  const { sessions, isLoading, signOutSession, isSigningOut } = useSessions();
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    changePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    });
    
    // Reset form
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSignOutSession = (sessionId: number) => {
    signOutSession(sessionId);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Password</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input 
                id="current-password" 
                type="password" 
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                required
              />
            </div>
            <div></div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input 
                id="new-password" 
                type="password" 
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isChanging}>
              {isChanging ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add an extra layer of security to your account
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Two-factor authentication is disabled
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Protect your account with two-factor authentication
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Enable
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Active Sessions</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your active sessions across devices
        </p>
        <div className="mt-4 space-y-4">
          {isLoading ? (
            <div>Loading sessions...</div>
          ) : (
            sessions?.map((session: any) => (
              <div key={session.id} className="p-4 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {session.current ? 'Current Session' : 'Session'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{session.device} • {session.location}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Started {new Date(session.startTime).toLocaleDateString()} at {new Date(session.startTime).toLocaleTimeString()}
                    </p>
                  </div>
                  {session.current ? (
                    <Badge>Current</Badge>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSignOutSession(session.id)}
                      disabled={isSigningOut}
                    >
                      {isSigningOut ? "Signing Out..." : "Sign Out"}
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
