'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { modelsService } from '@/services/models.service';
import { Model3D, Category } from '@/types/models3d.types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Toast } from '@/components/ui/Toast';
import {
  Upload,
  User,
  Trash2,
  Box,
  Layers,
  HardDrive,
  Calendar,
  Lock,
  Plus,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [myModels, setMyModels] = useState<Model3D[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; title: string; message: string } | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [polygonCount, setPolygonCount] = useState(25000);
  const [modelFile, setModelFile] = useState<File | null>(null);

  const fetchUserData = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const [modelsRes, catsRes] = await Promise.all([
        modelsService.getMyModels(),
        modelsService.getCategories(),
      ]);
      setMyModels(modelsRes.results || []);
      setCategories(catsRes.results || []);
    } catch {
      // Handled
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, fetchUserData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext !== 'glb' && ext !== 'gltf') {
        setToast({
          type: 'error',
          title: 'Invalid File Extension',
          message: 'Only .glb and .gltf files are supported.',
        });
        return;
      }
      if (file.size > 100 * 1024 * 1024) {
        setToast({
          type: 'error',
          title: 'File Too Large',
          message: 'File size exceeds maximum allowed limit of 100MB.',
        });
        return;
      }
      setModelFile(file);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelFile) {
      setToast({
        type: 'error',
        title: 'Missing 3D File',
        message: 'Please choose a .glb or .gltf 3D asset file to upload.',
      });
      return;
    }

    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if (categoryId) formData.append('category', categoryId);
      formData.append('polygon_count', String(polygonCount));
      formData.append('model_file', modelFile);

      await modelsService.uploadModel(formData);

      setToast({
        type: 'success',
        title: '3D Model Uploaded Successfully',
        message: `${name} has been processed and saved to the catalog.`,
      });

      // Reset form
      setName('');
      setDescription('');
      setModelFile(null);
      fetchUserData();
    } catch (err: any) {
      setToast({
        type: 'error',
        title: 'Upload Failed',
        message: err.response?.data?.message || 'Server rejected 3D model upload.',
      });
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDeleteModel = async (id: string, modelName: string) => {
    if (!confirm(`Are you sure you want to delete ${modelName}?`)) return;

    try {
      await modelsService.deleteModel(id);
      setToast({
        type: 'success',
        title: 'Model Deleted',
        message: `${modelName} was removed from the database.`,
      });
      fetchUserData();
    } catch {
      setToast({
        type: 'error',
        title: 'Delete Failed',
        message: 'Could not delete 3D model.',
      });
    }
  };

  if (authLoading) {
    return (
      <div className="py-24 text-center">
        <div className="animate-spin h-8 w-8 border-2 border-humorphic-orange border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="py-24 max-w-lg mx-auto px-4 text-center space-y-6">
        <div className="h-16 w-16 rounded-full bg-cyber-card border border-cyber-border text-humorphic-orange mx-auto flex items-center justify-center shadow-glow">
          <Lock className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-display font-bold text-white">
          AUTHENTICATION REQUIRED
        </h2>
        <p className="text-sm text-slate-400 font-sans leading-relaxed">
          Access to the Humorphic Telemetry Dashboard and 3D Asset Management requires valid JWT credentials.
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <Link href="/login">
            <Button variant="primary">LOGIN TO LAB</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">REGISTER NEW USER</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Toast feedback */}
        {toast && (
          <div className="fixed top-20 right-4 z-50">
            <Toast
              type={toast.type}
              title={toast.title}
              message={toast.message}
              onClose={() => setToast(null)}
            />
          </div>
        )}

        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-humorphic-orange tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-humorphic-orange" />
              ENGINEER TELEMETRY DASHBOARD // [STATION_ACTV]
            </div>
            <h1 className="text-3xl font-display font-extrabold text-white tracking-wide uppercase">
              WELCOME, <span className="text-humorphic-gold">{user?.username}</span>
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="bg-cyber-card border border-cyber-border px-3 py-1.5 rounded text-slate-300">
              ROLE: <strong className="text-white">{user?.role?.toUpperCase()}</strong>
            </span>
            <span className="bg-cyber-card border border-cyber-border px-3 py-1.5 rounded text-slate-300">
              ORG: <strong className="text-white">{user?.organization}</strong>
            </span>
          </div>
        </div>

        {/* Grid: Upload Form (5 Cols) + My Uploaded Models (7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Upload Form Box */}
          <div className="lg:col-span-5">
            <Card glow="orange" className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-mono text-humorphic-orange tracking-wider block mb-1">
                  // CAD INGESTION PIPELINE
                </span>
                <h3 className="text-xl font-display font-bold text-white">
                  UPLOAD NEW 3D MODEL
                </h3>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <Input
                  label="Model Name"
                  placeholder="e.g. 6-Axis Bipedal Ankle Assembly"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="block w-full rounded-md border border-cyber-border bg-cyber-card/90 px-3 py-2 text-sm text-slate-100 shadow-inner backdrop-blur-md focus:border-humorphic-orange focus:outline-none focus:ring-1 focus:ring-humorphic-orange"
                  >
                    <option value="">Select Robotics Category...</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Polygon Count"
                  type="number"
                  placeholder="e.g. 24000"
                  value={polygonCount}
                  onChange={(e) => setPolygonCount(Number(e.target.value))}
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
                    Description & Kinematic Notes
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Specify degrees of freedom, harmonic reduction ratio, or materials..."
                    className="block w-full rounded-md border border-cyber-border bg-cyber-card/90 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 shadow-inner backdrop-blur-md focus:border-humorphic-orange focus:outline-none focus:ring-1 focus:ring-humorphic-orange"
                  />
                </div>

                {/* File Dropzone */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
                    3D File (.GLB / .GLTF, Max 100MB)
                  </label>
                  <div className="relative border-2 border-dashed border-cyber-border hover:border-humorphic-orange/60 rounded-xl p-6 text-center cursor-pointer transition-colors bg-cyber-bg/40">
                    <input
                      type="file"
                      accept=".glb,.gltf"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required={!modelFile}
                    />
                    <Upload className="h-8 w-8 text-humorphic-orange mx-auto mb-2" />
                    {modelFile ? (
                      <div className="text-xs font-mono text-emerald-400 font-bold">
                        SELECTED: {modelFile.name} ({(modelFile.size / (1024 * 1024)).toFixed(2)} MB)
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="text-xs font-mono text-slate-300">
                          DRAG & DROP OR BROWSE FILE
                        </div>
                        <div className="text-[11px] font-mono text-slate-500">
                          Binary glTF (.glb) or glTF JSON (.gltf)
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full"
                    isLoading={uploadLoading}
                    leftIcon={<Plus className="h-4 w-4" />}
                  >
                    INGEST 3D MODEL
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* User's Models List Box */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-humorphic-gold tracking-wider block mb-1">
                  // REPOSITORY ASSETS
                </span>
                <h3 className="text-xl font-display font-bold text-white">
                  MY UPLOADED 3D MODELS ({myModels.length})
                </h3>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-28 rounded-xl bg-slate-800/50 animate-pulse" />
                ))}
              </div>
            ) : myModels.length > 0 ? (
              <div className="space-y-3">
                {myModels.map((model) => (
                  <div
                    key={model.id}
                    className="rounded-xl border border-cyber-border bg-cyber-card/80 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-xl hover:border-white/20 transition-colors"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase bg-humorphic-orange/20 text-humorphic-orange border border-humorphic-orange/40 px-2 py-0.5 rounded font-bold">
                          .{model.format.toUpperCase()}
                        </span>
                        <h4 className="text-base font-display font-bold text-white">
                          {model.name}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-1">
                        {model.description || 'No description provided.'}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-500 pt-1">
                        <span>{model.polygon_count.toLocaleString()} Polys</span>
                        <span>{model.file_size_formatted}</span>
                        <span>{formatDate(model.created_at)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <a href={model.model_file} download target="_blank" rel="noreferrer">
                        <Button variant="outline" size="sm">
                          GET FILE
                        </Button>
                      </a>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteModel(model.id, model.name)}
                        aria-label="Delete 3D model"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-xl border border-cyber-border bg-cyber-card/40 p-8 space-y-3">
                <Box className="h-10 w-10 text-slate-500 mx-auto" />
                <h4 className="text-base font-display font-bold text-white">
                  NO ASSETS IN YOUR WORKSPACE
                </h4>
                <p className="text-xs text-slate-400 font-mono max-w-sm mx-auto">
                  Upload your first GLTF/GLB model using the form on the left.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
