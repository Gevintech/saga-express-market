import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Listing } from './useListings';

export const useSavedListings = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['saved-listings', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('saved_listings')
        .select(`
          id,
          listing_id,
          created_at,
          listings (
            *,
            profiles:user_id (
              full_name,
              avatar_url
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return ((data || []) as any[]).map(item => ({
        savedId: item.id,
        ...(item.listings as Listing),
      }));
    },
    enabled: !!user,
  });
};

export const useIsSaved = (listingId: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['is-saved', listingId, user?.id],
    queryFn: async () => {
      if (!user) return false;

      const { data, error } = await supabase
        .from('saved_listings')
        .select('id')
        .eq('user_id', user.id)
        .eq('listing_id', listingId)
        .maybeSingle();

      if (error) throw error;
      return !!data;
    },
    enabled: !!user && !!listingId,
  });
};

export const useToggleSave = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ listingId, isSaved }: { listingId: string; isSaved: boolean }) => {
      if (!user) throw new Error('Must be logged in');

      if (isSaved) {
        const { error } = await supabase
          .from('saved_listings')
          .delete()
          .eq('user_id', user.id)
          .eq('listing_id', listingId);

        if (error) throw error;
        return { saved: false };
      } else {
        const { error } = await supabase
          .from('saved_listings')
          .insert({
            user_id: user.id,
            listing_id: listingId,
          } as any);

        if (error) throw error;
        return { saved: true };
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['saved-listings'] });
      queryClient.invalidateQueries({ queryKey: ['is-saved', variables.listingId] });
      toast.success(data.saved ? 'Saved to favorites' : 'Removed from favorites');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to save listing');
    },
  });
};
