import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { API_BASE_URL } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

interface Category {
  _id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
}

const AdminCategoryManager = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Create new category
  const handleCreate = async () => {
    if (!newCategory.trim()) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory.trim() })
      });
      
      if (response.ok) {
        setNewCategory('');
        fetchCategories();
      } else {
        const error = await response.json();
        setError(error.message);
      }
    } catch (err) {
      setError('Failed to create category');
    }
  };

  // Update category
  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName.trim() })
      });
      
      if (response.ok) {
        setEditingId(null);
        setEditName('');
        fetchCategories();
      } else {
        const error = await response.json();
        setError(error.message);
      }
    } catch (err) {
      setError('Failed to update category');
    }
  };

  // Delete category
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"? This will fail if it has assessments.`)) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchCategories();
      } else {
        const error = await response.json();
        setError(error.message);
      }
    } catch (err) {
      setError('Failed to delete category');
    }
  };

  // Start editing
  const startEdit = (category: Category) => {
    setEditingId(category._id);
    setEditName(category.name);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="outline"
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Admin
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Category Management</h1>
            <p className="text-muted-foreground">Manage assessment categories</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Add New Category */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Category name"
                  className="flex-1"
                />
                <Button onClick={handleCreate} disabled={!newCategory.trim()}>
                  Add Category
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Categories List */}
          <Card>
            <CardHeader>
              <CardTitle>Categories ({categories.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading categories...</div>
              ) : categories.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No categories found. Add your first category above.
                </div>
              ) : (
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category._id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      {editingId === category._id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleUpdate(category._id)}
                            disabled={!editName.trim()}
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={cancelEdit}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1">
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Created: {new Date(category.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEdit(category)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(category._id, category.name)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminCategoryManager;
