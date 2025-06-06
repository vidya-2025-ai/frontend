
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center px-6 py-16 bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-xl max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
            <span className="text-5xl font-bold text-gray-800">404</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! We couldn't find the page you were looking for.</p>
        <Link to="/">
          <Button className="bg-gradient-to-r from-[#007bff] to-[#00d4ff] hover:from-[#0069d9] hover:to-[#00a3cc] text-white font-medium px-6 py-2 rounded-md flex items-center justify-center mx-auto">
            <ArrowLeft className="mr-2 h-5 w-5" /> Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
