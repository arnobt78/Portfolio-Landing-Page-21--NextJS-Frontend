"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  User,
  BarChart3,
  Eye,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Clés pour le localStorage
const STORAGE_KEYS = {
  POSTS: "dashboard_posts",
  PROJECTS: "dashboard_projects",
};

// Données initiales pour les articles
const initialPosts = [
  {
    id: 1,
    title: "Welcome to the dashboard",
    excerpt: "Here is an overview of your administration interface",
    content: "This is an example article for your admin panel.",
    category: "Informations",
    tags: ["dashboard", "example"],
    publishedAt: new Date().toISOString(),
    status: "published",
  },
];

// Données initiales pour les projets
const initialProjects = [
  {
    id: "proj-1",
    title: "Example Project",
    description: "This is an example project to demonstrate the CRUD system.",
    category: "frontend",
    tech: [
      { name: "React", icon: null },
      { name: "TypeScript", icon: null },
    ],
    repoGit: "https://google.com",
    liveUrl: "#",
    imageUrl: "",
  },
];

// Interface TypeScript pour un projet
interface Tech {
  name: string;
  icon: React.ComponentType<{ className?: string }> | null;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: Tech[];
  repoGit: string;
  liveUrl: string;
  imageUrl: string;
}

interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  status: string;
}

const DashboardClient: React.FC = () => {
  const { toast } = useToast();

  // États pour les articles et projets
  const [posts, setPosts] = useState<Post[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // États pour l'édition
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // États pour contrôler l'affichage des formulaires
  const [showPostForm, setShowPostForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);

  // Formulaire pour les articles
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
  });

  // Formulaire pour les projets
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    category: "",
    techString: "",
    repoGit: "",
    liveUrl: "",
    imageUrl: "",
  });

  // Fonction pour charger les données depuis le localStorage
  const loadFromStorage = () => {
    try {
      const savedPosts = localStorage.getItem(STORAGE_KEYS.POSTS);
      const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);

      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      } else {
        setPosts(initialPosts);
        localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(initialPosts));
      }

      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      } else {
        setProjects(initialProjects);
        localStorage.setItem(
          STORAGE_KEYS.PROJECTS,
          JSON.stringify(initialProjects),
        );
      }
    } catch (error) {
      console.error("Erreur lors du chargement depuis le localStorage:", error);
      setPosts(initialPosts);
      setProjects(initialProjects);
    }
  };

  // Chargement initial depuis le localStorage (deferred to satisfy react-hooks/set-state-in-effect)
  useEffect(() => {
    queueMicrotask(() => loadFromStorage());
  }, []);

  // Fonction pour sauvegarder les articles dans le localStorage
  const savePostsToStorage = (updatedPosts: Post[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(updatedPosts));
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des articles:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les articles.",
        variant: "destructive",
      });
    }
  };

  // Fonction pour sauvegarder les projets dans le localStorage
  const saveProjectsToStorage = (updatedProjects: Project[]) => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.PROJECTS,
        JSON.stringify(updatedProjects),
      );
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des projets:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les projets.",
        variant: "destructive",
      });
    }
  };

  /* ---------------------------
     Fonctions Article
  --------------------------- */
  const handleCreatePost = () => {
    setEditingPost(null);
    setShowPostForm(true);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: "",
    });
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setShowPostForm(true);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(", "),
    });
  };

  const handleSavePost = () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "The title and content are required.",
        variant: "destructive",
      });
      return;
    }

    const newPost = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      publishedAt: new Date().toISOString(),
      status: "published",
    };

    if (editingPost) {
      // Mise à jour d'un article existant
      const updatedPosts = posts.map((p) =>
        p.id === editingPost.id ? { ...p, ...newPost } : p,
      );
      savePostsToStorage(updatedPosts);
      toast({ title: "Success", description: "Article updated." });
    } else {
      // Création d'un nouvel article
      const updatedPosts = [{ id: Date.now(), ...newPost } as Post, ...posts];
      savePostsToStorage(updatedPosts);
      toast({ title: "Success", description: "Article added." });
    }

    setEditingPost(null);
    setShowPostForm(false);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: "",
    });
  };

  const handleDeletePost = (id: number) => {
    const updatedPosts = posts.filter((p) => p.id !== id);
    savePostsToStorage(updatedPosts);
    toast({ title: "Deleted", description: "Article deleted." });
  };

  /* ---------------------------
     Fonctions Projet
  --------------------------- */
  const handleCreateProject = () => {
    setEditingProject(null);
    setShowProjectForm(true);
    setProjectForm({
      title: "",
      description: "",
      category: "",
      techString: "",
      repoGit: "",
      liveUrl: "",
      imageUrl: "",
    });
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
    setProjectForm({
      title: project.title,
      description: project.description,
      category: project.category || "",
      techString: project.tech.map((t) => t.name).join(", "),
      repoGit: project.repoGit || "",
      liveUrl: project.liveUrl || "",
      imageUrl: project.imageUrl || "",
    });
  };

  const handleSaveProject = () => {
    if (!projectForm.title || !projectForm.description) {
      toast({
        title: "Error",
        description: "The title and description are required.",
        variant: "destructive",
      });
      return;
    }

    // Construction du nouvel objet projet avec tous les champs
    const newProject: Project = {
      id: editingProject?.id || `proj-${Date.now()}`,
      title: projectForm.title,
      description: projectForm.description,
      category: projectForm.category,
      tech: projectForm.techString
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name)
        .map((name) => ({ name, icon: null })),
      repoGit: projectForm.repoGit,
      liveUrl: projectForm.liveUrl || "#",
      imageUrl: projectForm.imageUrl,
    };

    if (editingProject) {
      // Mise à jour d'un projet existant
      const updatedProjects = projects.map((p) =>
        p.id === editingProject.id ? newProject : p,
      );
      saveProjectsToStorage(updatedProjects);
      toast({ title: "Success", description: "Project updated." });
    } else {
      // Création d'un nouveau projet
      const updatedProjects = [newProject, ...projects];
      saveProjectsToStorage(updatedProjects);
      toast({ title: "Success", description: "Project added." });
    }

    setEditingProject(null);
    setShowProjectForm(false);
    setProjectForm({
      title: "",
      description: "",
      category: "",
      techString: "",
      repoGit: "",
      liveUrl: "",
      imageUrl: "",
    });
  };

  const handleDeleteProject = (id: string) => {
    const updatedProjects = projects.filter((p) => p.id !== id);
    saveProjectsToStorage(updatedProjects);
    toast({ title: "Deleted", description: "Project deleted." });
  };

  /* ---------------------------
     Statistiques
  --------------------------- */
  const stats = {
    totalPosts: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    projects: projects.length,
  };

  /* ---------------------------
     UI
  --------------------------- */
  return (
    <section className="py-10 px-4 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <header className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
            <p className="text-text-secondary">
              Manage your articles and projects easily
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCreatePost}>
              <Plus className="w-4 h-4 mr-1" /> New Article
            </Button>
            <Button onClick={handleCreateProject} variant="outline">
              <Plus className="w-4 h-4 mr-1" /> New Project
            </Button>
          </div>
        </header>

        {/* Statistiques */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Published Articles: {stats.published}
                </p>
                <h2 className="text-2xl font-semibold">{stats.published}</h2>
              </div>
              <Eye className="w-6 h-6 text-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Projects: {stats.projects}
                </p>
                <h2 className="text-2xl font-semibold">{stats.projects}</h2>
              </div>
              <BarChart3 className="w-6 h-6 text-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Articles: {stats.totalPosts}
                </p>
                <h2 className="text-2xl font-semibold">{stats.totalPosts}</h2>
              </div>
              <User className="w-6 h-6 text-primary" />
            </CardContent>
          </Card>
        </div>

        {/* Articles */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Articles</h2>
          {showPostForm && (
            <Card className="mb-6">
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>
                  {editingPost ? "Edit Article" : "New Article"}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPostForm(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <Input
                  placeholder="Excerpt"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                />
                <Input
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
                <Input
                  placeholder="Tags (separated by commas)"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                />
                <div className="flex gap-2">
                  <Button onClick={handleSavePost}>
                    <Save className="w-4 h-4 mr-1" /> Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowPostForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-5">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{post.title}</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPost(post)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm mt-2 text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <Badge className="mt-2">{post.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Projets */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          {showProjectForm && (
            <Card className="mb-6">
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>
                  {editingProject ? "Edit Project" : "New Project"}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProjectForm(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Project Title"
                  value={projectForm.title}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, title: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Project Description"
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                />
                <Input
                  placeholder="Category (ex: frontend, backend, fullstack)"
                  value={projectForm.category}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, category: e.target.value })
                  }
                />
                <Input
                  placeholder="Technologies (separated by commas)"
                  value={projectForm.techString}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      techString: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="GitHub Repository URL"
                  value={projectForm.repoGit}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, repoGit: e.target.value })
                  }
                />
                <Input
                  placeholder="Live URL (optional)"
                  value={projectForm.liveUrl}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, liveUrl: e.target.value })
                  }
                />
                <Input
                  placeholder="Image URL (optional)"
                  value={projectForm.imageUrl}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, imageUrl: e.target.value })
                  }
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveProject}>
                    <Save className="w-4 h-4 mr-1" /> Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowProjectForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold">{project.title}</h3>
                      {project.category && (
                        <Badge variant="secondary" className="mt-1">
                          {project.category}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProject(project)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm mt-2 text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {project.tech.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                  {project.repoGit && (
                    <div className="mt-3 text-xs text-muted-foreground truncate">
                      Repo: {project.repoGit}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardClient;
