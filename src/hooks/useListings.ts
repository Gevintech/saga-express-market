import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Listing {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  price: number;
  currency: string;
  location: string;
  region: string;
  category: string;
  condition: string;
  is_promoted: boolean;
  is_featured: boolean;
  is_negotiable: boolean | null;
  phone: string | null;
  images: string[];
  specs: Record<string, string> | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}

export interface ListingInsert {
  user_id: string;
  title: string;
  description?: string | null;
  price: number;
  currency?: string;
  location: string;
  region: string;
  category: string;
  condition: string;
  is_promoted?: boolean;
  is_featured?: boolean;
  is_negotiable?: boolean | null;
  phone?: string | null;
  images?: string[];
  specs?: Record<string, string> | null;
}

export interface ListingUpdate {
  title?: string;
  description?: string | null;
  price?: number;
  location?: string;
  region?: string;
  category?: string;
  condition?: string;
  is_promoted?: boolean;
  is_featured?: boolean;
  is_negotiable?: boolean | null;
  phone?: string | null;
  images?: string[];
  specs?: Record<string, string> | null;
}

export const useListings = (filters?: {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  condition?: string;
}) => {
  return useQuery({
    queryKey: ['listings', filters],
    queryFn: async () => {
      let query = supabase
        .from('listings')
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      if (filters?.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }
      if (filters?.minPrice) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters?.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }
      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      if (filters?.condition) {
        query = query.eq('condition', filters.condition);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return (data || []) as Listing[];
    },
  });
};

export const useListing = (id: string) => {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as Listing | null;
    },
    enabled: !!id,
  });
};

export const useUserListings = (userId: string) => {
  return useQuery({
    queryKey: ['user-listings', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as Listing[];
    },
    enabled: !!userId,
  });
};

export const useCreateListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (listing: ListingInsert) => {
      const { data, error } = await supabase
        .from('listings')
        .insert(listing as any)
        .select()
        .single();

      if (error) throw error;
      return data as Listing;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      toast.success('Listing created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create listing');
    },
  });
};

export const useUpdateListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ListingUpdate }) => {
      const { data, error } = await supabase
        .from('listings')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Listing;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ['listing', data.id] });
      }
      toast.success('Listing updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update listing');
    },
  });
};

export const useDeleteListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      toast.success('Listing deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete listing');
    },
  });
};
