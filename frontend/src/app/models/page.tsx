'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { modelsService } from '@/services/models.service';
import { Model3D, Category } from '@/types/models3d.types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import { ModelViewer } from '@/components/3d/ModelViewer';
import {
  Box,
  Search,
  Filter,
  Layers,
  HardDrive,
  Download,
  Calendar,
  User,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function ModelsPage() {
  const [models, setModels] = useState<Model3D[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [previewModel, setPreviewModel] = useState<Model3D | null>(null);

  const fetchModelsData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [modelsRes, catsRes] = await Promise.all([
        modelsService.getModels({
          category: selectedCategory || undefined,
          search: searchQuery || undefined,
        }),
        modelsService.getCategories(),
      ]);
      setModels(modelsRes.results || []);
      setCategories(catsRes.results || []);
    } catch {
      // Keep empty if network fails
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchModelsData();
  }, [fetchModelsData]);

  return (
    <div className="py-12 relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-humorphic-orange tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-humorphic-orange" />
            HUMORPHIC CAD REPOSITORY // [GLTF_GLB_CATALOG]
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-wide uppercase">
            3D ROBOTIC <span className="text-humorphic-orange">MODEL</span> CATALOG
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-3xl">
            Stream, inspect, and integrate production-ready GLTF/GLB humanoid kinematics, harmonic actuators, and LiDAR perception bays into your simulations.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 bg-cyber-card/70 p-4 rounded-xl border border-cyber-border backdrop-blur-xl">
          
          {/* Search Input */}
          <div className="w-full md:w-80">
            <Input
              placeholder="Search 3D models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors whitespace-nowrap ${
                selectedCategory === ''
                  ? 'bg-humorphic-orange text-white font-bold shadow-glow'
                  : 'bg-cyber-bg text-slate-400 border border-white/5 hover:text-white'
              }`}
            >
              ALL CATEGORIES
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors whitespace-nowrap ${
                  selectedCategory === cat.slug
                    ? 'bg-humorphic-orange text-white font-bold shadow-glow'
                    : 'bg-cyber-bg text-slate-400 border border-white/5 hover:text-white'
                }`}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>

        </div>

        {/* 3D Models Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-80 w-full rounded-2xl" />
            ))}
          </div>
        ) : models.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <Card
                key={model.id}
                glow="orange"
                className="flex flex-col justify-between p-6 group hover:border-humorphic-orange/60"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase bg-humorphic-orange/20 text-humorphic-orange border border-humorphic-orange/40 px-2 py-0.5 rounded font-bold">
                      .{model.format.toUpperCase()}
                    </span>
                    {model.category && (
                      <span className="text-[11px] font-mono text-slate-400">
                        {model.category.name}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-humorphic-gold transition-colors">
                    {model.name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {model.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-humorphic-gold" />
                      <span>{model.polygon_count.toLocaleString()} Polys</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <HardDrive className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{model.file_size_formatted}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-slate-500" />
                      <span>{model.uploaded_by_username}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-500" />
                      <span>{formatDate(model.created_at)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setPreviewModel(model)}
                      leftIcon={<Eye className="h-3.5 w-3.5" />}
                    >
                      3D PREVIEW
                    </Button>
                    <a
                      href={model.model_file}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        leftIcon={<Download className="h-3.5 w-3.5" />}
                      >
                        DOWNLOAD
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border border-cyber-border bg-cyber-card/60 p-8 space-y-4">
            <Box className="h-12 w-12 text-slate-500 mx-auto" />
            <h3 className="text-lg font-display font-bold text-white">
              NO 3D MODELS MATCHING PARAMETERS
            </h3>
            <p className="text-xs text-slate-400 font-mono max-w-sm mx-auto">
              Try adjusting your category filter or search query.
            </p>
            <Button variant="outline" size="sm" onClick={() => { setSelectedCategory(''); setSearchQuery(''); }}>
              RESET FILTERS
            </Button>
          </div>
        )}

      </div>

      {/* 3D Preview Modal */}
      {previewModel && (
        <Modal
          isOpen={!!previewModel}
          onClose={() => setPreviewModel(null)}
          subtitle={`3D MODEL INSPECTION // .${previewModel.format.toUpperCase()}`}
          title={previewModel.name}
          maxWidth="4xl"
        >
          <div className="space-y-4">
            <div className="h-[480px] w-full rounded-xl overflow-hidden border border-cyber-border">
              <ModelViewer modelUrl={previewModel.model_file} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="text-xs font-mono text-slate-400 space-x-4">
                <span>POLYGONS: <strong className="text-white">{previewModel.polygon_count.toLocaleString()}</strong></span>
                <span>SIZE: <strong className="text-white">{previewModel.file_size_formatted}</strong></span>
                <span>CREATOR: <strong className="text-white">{previewModel.uploaded_by_username}</strong></span>
              </div>
              <a href={previewModel.model_file} download target="_blank" rel="noreferrer">
                <Button variant="primary" size="sm" leftIcon={<Download className="h-4 w-4" />}>
                  DOWNLOAD {previewModel.format.toUpperCase()} FILE
                </Button>
              </a>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
