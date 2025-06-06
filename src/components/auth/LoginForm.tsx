
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LoginFormProps {
  type: 'student' | 'organization';
}

const LoginForm: React.FC<LoginFormProps> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, error, clearError } = useAuth();

  // Clear error when component unmounts or type changes
  useEffect(() => {
    return () => clearError();
  }, [type, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Convert type to role
      console.log(`Logging in as ${type} with email:`, email);
      await login(email, password);
    } catch (error) {
      console.error('Login error in component:', error);
      // Error is already handled in the useAuth hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" 
              required 
              className="vs-input-focus"
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-xs text-vs-purple-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required 
              className="vs-input-focus"
              disabled={loading}
            />
          </div>
          
          <Button 
            type="submit" 
            className={`w-full ${
              type === 'student' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-purple-600 hover:bg-purple-700'
            } text-white`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Log In'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Don't have an account?
          {' '}
          <Link 
            to="/register" 
            className="text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
