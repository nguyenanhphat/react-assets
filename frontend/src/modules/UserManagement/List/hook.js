import axios from '../../../utils/axios';
import { useQuery } from 'react-query';

export const useSyncUserFromIdentity = callback => {
  return useQuery(
    'syncUsers',
    async () => {
      const { data } = await axios.post('user/sync');
      return data;
    },
    { onSuccess: callback, enabled: false }
  );
};

export const useGetUsers = searchParams => {
  return useQuery(
    'users',
    async () => {
      const { data } = await axios.get('user', {
        params: { ...searchParams },
      });
      return data?.data || null;
    },
    { enabled: false }
  );
};
