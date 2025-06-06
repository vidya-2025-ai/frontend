
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ResumeTemplatesProps {
  onUseTemplate: (template: string) => void;
}

const ResumeTemplates: React.FC<ResumeTemplatesProps> = ({ onUseTemplate }) => {
  const templates = ["Professional", "Modern", "Creative", "Technical", "Academic", "Minimalist"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{template}</CardTitle>
            <CardDescription>Resume Template</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">{template} Preview</p>
            </div>
            <Button onClick={() => onUseTemplate(`${template} Resume`)}>
              Use Template
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResumeTemplates;
