import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { userService } from "@/services/api/userService";

// Define separate schemas for students and recruiters
const studentFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  bio: z.string().optional(),
  skills: z.string().optional(),
});

const recruiterFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  organization: z.string().min(2, "Organization name must be at least 2 characters."),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters."),
  bio: z.string().optional(),
});

// Type for form values based on user type
type StudentFormValues = z.infer<typeof studentFormSchema>;
type RecruiterFormValues = z.infer<typeof recruiterFormSchema>;
type FormValues = StudentFormValues | RecruiterFormValues;

export function SettingsForm({ userType }: { userType: "student" | "recruiter" }) {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Determine the form schema based on user type
  const formSchema = userType === "student" ? studentFormSchema : recruiterFormSchema;
  
  // Create form with proper default values based on user type
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: userType === "student" ? {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      bio: user?.bio || "",
      skills: user?.skills ? user.skills.join(", ") : "",
    } : {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      organization: user?.organization || "",
      jobTitle: user?.jobTitle || "",
      bio: user?.bio || "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      setIsUpdating(true);
      
      // Create userData as a proper type that matches User shape
      const userData: Record<string, any> = { ...values };
      
      // Handle student-specific fields - convert skills string to array for API
      if (userType === "student" && "skills" in values && values.skills) {
        // Convert string to array and remove the original string property
        userData.skills = values.skills.split(",").map(skill => skill.trim()).filter(Boolean);
      }
      
      // Update profile
      const updatedUser = await userService.updateUserProfile(userData);
      updateUser(updatedUser);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Profile photo must be less than 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }
    
    setPhotoFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadPhoto = async () => {
    if (!photoFile) return;
    
    try {
      setIsUploading(true);
      
      const result = await userService.uploadProfilePhoto(photoFile);
      
      // Update user context with new avatar
      updateUser({ ...user, avatar: result.avatar });
      
      toast({
        title: "Photo uploaded",
        description: "Your profile photo has been updated.",
      });
      
      // Clear file input
      setPhotoFile(null);
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload your profile photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getAvatarUrl = () => {
    // Check for preview first
    if (photoPreview) {
      return photoPreview;
    }
    
    // If user has avatar and it's a valid URL or path
    if (user?.avatar) {
      // If it's an absolute URL, return it as is
      if (user.avatar.startsWith('http') || user.avatar.startsWith('data:')) {
        return user.avatar;
      }
      // Otherwise, it's a relative path on the server
      return `http://localhost:5000${user.avatar}`;
    }
    return null;
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    } else if (user?.firstName) {
      return user.firstName[0];
    }
    return 'U';
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo */}
      <div>
        <h3 className="text-lg font-medium">Profile Photo</h3>
        <div className="flex items-center mt-4 space-x-6">
          <Avatar className="h-24 w-24">
            {getAvatarUrl() && (
              <AvatarImage src={getAvatarUrl() || ''} alt={`${user?.firstName} ${user?.lastName}`} />
            )}
            <AvatarFallback className="text-xl">{getUserInitials()}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <label htmlFor="photo-upload" className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm text-gray-700 flex items-center mr-2">
                <UploadCloud className="h-4 w-4 mr-2" />
                Choose File
              </label>
              {photoFile && (
                <Button 
                  onClick={uploadPhoto} 
                  disabled={isUploading}
                  size="sm"
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              )}
            </div>
            <input 
              id="photo-upload" 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handlePhotoChange} 
            />
            <p className="text-xs text-gray-500">
              JPEG, PNG or GIF. Max 5MB.
            </p>
            {photoFile && (
              <p className="text-xs text-gray-700">
                Selected: {photoFile.name} ({Math.round(photoFile.size / 1024)} KB)
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Profile Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} disabled />
                </FormControl>
                <FormDescription>
                  You can't change your email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {userType === "student" ? (
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Python, React, Data Analysis" {...field} />
                  </FormControl>
                  <FormDescription>
                    Separate skills with commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="Organization name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Your role in the organization" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="A brief description about yourself" {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
