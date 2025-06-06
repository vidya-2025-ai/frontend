
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAccountActions } from '@/hooks/useSettings';

const PrivacySettings = () => {
  const { resetData, deleteAccount, isResetting, isDeleting } = useAccountActions();

  const handleDownloadData = () => {
    // Mock implementation - in production this would trigger a data export
    const dataUrl = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
      message: "Data export feature will be implemented in a future update",
      timestamp: new Date().toISOString()
    }));
    
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'user-data.json';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Data Management</h3>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium">Profile Visibility</h4>
              <p className="text-sm text-gray-500">Control who can view your profile</p>
            </div>
            <Button variant="outline">Manage</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium">Download Your Data</h4>
              <p className="text-sm text-gray-500">Get a copy of your personal data</p>
            </div>
            <Button variant="outline" onClick={handleDownloadData}>Download</Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium">Reset Account Data</h4>
              <p className="text-sm text-gray-500">Delete all your applications and activity</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isResetting}>
                  {isResetting ? "Resetting..." : "Reset Data"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all your applications, 
                    saved internships, and activity history from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => resetData()}
                  >
                    Reset All Data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium">Delete Account</h4>
              <p className="text-sm text-gray-500">Permanently delete your account</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Delete Account"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your 
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => deleteAccount()}
                  >
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
