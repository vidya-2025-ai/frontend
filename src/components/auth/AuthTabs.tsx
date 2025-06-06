
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthTabsProps {
  isLogin?: boolean;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ isLogin = false }) => {
  const [activeTab, setActiveTab] = useState("student");
  
  return (
    <Tabs defaultValue="student" className="w-full max-w-md mx-auto" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="organization">Organization</TabsTrigger>
      </TabsList>
      <TabsContent value="student" className="mt-6">
        {isLogin ? (
          <LoginForm type="student" />
        ) : (
          <RegisterForm type="student" />
        )}
      </TabsContent>
      <TabsContent value="organization" className="mt-6">
        {isLogin ? (
          <LoginForm type="organization" />
        ) : (
          <RegisterForm type="organization" />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;
