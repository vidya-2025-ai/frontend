
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Edit, X, ExternalLink } from 'lucide-react';

interface Project {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  githubLink?: string;
  startDate?: string;
  endDate?: string;
  status: 'Completed' | 'In Progress' | 'On Hold';
}

interface ProjectsFormProps {
  initialData?: Project[];
  onSave: (data: Project[]) => void;
  onCancel: () => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ initialData = [], onSave, onCancel }) => {
  const [projects, setProjects] = useState<Project[]>(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentTech, setCurrentTech] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Project>();

  const handleAddProject = (data: Project) => {
    const projectData = { ...data, technologies };
    
    if (editingIndex !== null) {
      const updated = [...projects];
      updated[editingIndex] = { ...projectData, id: updated[editingIndex].id || Date.now().toString() };
      setProjects(updated);
      setEditingIndex(null);
    } else {
      setProjects([...projects, { ...projectData, id: Date.now().toString() }]);
    }
    
    reset();
    setTechnologies([]);
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    const project = projects[index];
    reset(project);
    setTechnologies(project.technologies || []);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const addTechnology = () => {
    if (currentTech.trim() && !technologies.includes(currentTech.trim())) {
      setTechnologies([...technologies, currentTech.trim()]);
      setCurrentTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  const handleSave = () => {
    onSave(projects);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Button 
          onClick={() => setShowForm(true)} 
          disabled={showForm}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingIndex !== null ? 'Edit Project' : 'Add Project'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleAddProject)} className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title <span className="text-red-500">*</span></Label>
                <Input 
                  id="title" 
                  placeholder="e.g., E-commerce Web Application"
                  {...register('title', { required: 'Project title is required' })}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
              </div>

              <div>
                <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your project, its purpose, key features, and your role..."
                  {...register('description', { required: 'Project description is required' })}
                  rows={4}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
              </div>

              <div>
                <Label>Technologies Used</Label>
                <div className="flex gap-2 mb-2">
                  <Input 
                    value={currentTech}
                    onChange={(e) => setCurrentTech(e.target.value)}
                    placeholder="e.g., React, Node.js, MongoDB"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  />
                  <Button type="button" onClick={addTechnology}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <button 
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="link">Live Demo URL</Label>
                  <Input 
                    id="link" 
                    placeholder="https://your-project.com"
                    {...register('link')}
                  />
                </div>
                <div>
                  <Label htmlFor="githubLink">GitHub Repository</Label>
                  <Input 
                    id="githubLink" 
                    placeholder="https://github.com/username/project"
                    {...register('githubLink')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input 
                    id="startDate" 
                    type="month"
                    {...register('startDate')}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input 
                    id="endDate" 
                    type="month"
                    {...register('endDate')}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select 
                    id="status"
                    {...register('status')}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingIndex(null);
                    setTechnologies([]);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingIndex !== null ? 'Update' : 'Add'} Project
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {projects.map((project, index) => (
          <Card key={project.id || index}>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{project.title}</h4>
                    <Badge variant={project.status === 'Completed' ? 'default' : project.status === 'In Progress' ? 'secondary' : 'outline'}>
                      {project.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {project.startDate && (
                      <span>{project.startDate} - {project.endDate || 'Present'}</span>
                    )}
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Live Demo
                      </a>
                    )}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEdit(index)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No projects added yet. Add your first project to showcase your work.</p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default ProjectsForm;
