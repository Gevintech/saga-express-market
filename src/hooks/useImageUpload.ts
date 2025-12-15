import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useImageUpload = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!user) {
      toast.error('Must be logged in to upload images');
      return null;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    setUploading(true);
    setProgress(0);

    try {
      const { data, error } = await supabase.storage
        .from('listing-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('listing-images')
        .getPublicUrl(data.path);

      setProgress(100);
      return publicUrl;
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      setProgress(Math.round((i / files.length) * 100));
      const url = await uploadImage(files[i]);
      if (url) urls.push(url);
    }
    
    setProgress(100);
    return urls;
  };

  const deleteImage = async (url: string): Promise<boolean> => {
    try {
      // Extract the path from the URL
      const path = url.split('/listing-images/')[1];
      if (!path) return false;

      const { error } = await supabase.storage
        .from('listing-images')
        .remove([path]);

      if (error) throw error;
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete image');
      return false;
    }
  };

  return {
    uploadImage,
    uploadMultipleImages,
    deleteImage,
    uploading,
    progress,
  };
};
