import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { ASSETS } from 'routers/route-path';
import { notifySuccess } from 'utils/notification';
import axios from '../../utils/axios';

export function useGetSuppliers() {
  return useQuery(
    'asset_GetSuppliers',
    async () => {
      const { data } = await axios.post(
        'integration/suppliers',
        {
          ids: [],
        },
        { baseURL: process.env.REACT_APP_API_FIN_PLAN }
      );
      return data?.result || [];
    },
    { enabled: false }
  );
}

export function useGetSupplierContracts() {
  return useQuery(
    'asset_GetSupplierContracts',
    async () => {
      const { data } = await axios.post(
        'integration/supplier-contracts',
        {
          ids: [],
          supplierIds: [],
        },
        { baseURL: process.env.REACT_APP_API_FIN_PLAN }
      );
      return data?.result || [];
    },
    { enabled: false }
  );
}

const assetDetailQueryKey = 'asset_assetDetail';
export function useAssetDetail(id) {
  return useQuery(
    assetDetailQueryKey,
    async () => {
      const { data } = await axios.get('asset/detail/' + id);
      return data?.data?.asset || [];
    },
    { enabled: false, retry: false, cacheTime: 0 }
  );
}

export function useGenericOption() {
  return useQuery(
    'asset_genericOption',
    async () => {
      const { data } = await axios.get('genericOption/list');
      return data?.data?.genericOptions || [];
    },
    { enabled: false }
  );
}

export function useListUsers(searchParam) {
  return useQuery(
    'asset_listUsers',
    async () => {
      const { data } = await axios.get('user/', {
        params: {
          ...searchParam,
        },
      });
      return data?.data?.users || [];
    },
    { enabled: false }
  );
}

export const useCreateUpdateAsset = (id, closeAfterSave) => {
  const queryClient = useQueryClient();
  const history = useHistory();
  return useMutation(
    payload => {
      return id === 'new' || id === ''
        ? axios.post('asset/detail', payload)
        : axios.put(`asset/detail/${id}`, payload);
    },
    {
      onSuccess: () => {
        console.log('closeAfterSave', closeAfterSave);
        if (id && !closeAfterSave) {
          notifySuccess('Update', 'Update Successfully');
          queryClient.invalidateQueries(assetDetailQueryKey);
          queryClient.refetchQueries(assetDetailQueryKey);
        }
        if (id && closeAfterSave) {
          notifySuccess('Update', 'Update Successfully');
          history.push(ASSETS);
        }

        if (!id && !closeAfterSave) {
          notifySuccess('Create', 'Create Successfully');
          queryClient.invalidateQueries(assetDetailQueryKey);
          queryClient.refetchQueries(assetDetailQueryKey);
        }

        if (!id && closeAfterSave) {
          notifySuccess('Create', 'Create Successfully');
          history.push(ASSETS);
        }
      },
    }
  );
};

export const useCreateUpdateUsageHistory = (id, callbackSuccess) => {
  const queryClient = useQueryClient();
  return useMutation(
    payload => {
      return id === 'new' || id === '' || !id
        ? axios.post('usageHistories/detail', payload)
        : axios.put(`usageHistories/detail/${id}`, payload);
    },
    {
      onSuccess: data => {
        callbackSuccess(data?.data?.data?.usageHistory);
        if (data?.data?.data?.usageHistory) {
          queryClient.invalidateQueries('asset_UsageHistories');
          queryClient.refetchQueries('asset_UsageHistories');
        }
      },
    }
  );
};

export const useCreateUpdateMaintenanceHistory = (id, callbackSuccess) => {
  const queryClient = useQueryClient();
  return useMutation(
    payload => {
      return id === 'new' || id === '' || !id
        ? axios.post('maintenanceHistories/detail', payload)
        : axios.put(`maintenanceHistories/detail/${id}`, payload);
    },
    {
      onSuccess: data => {
        callbackSuccess(data?.data?.data?.maintenanceHistory);
        if (data?.data?.data?.maintenanceHistory) {
          queryClient.invalidateQueries('asset_UsageHistories');
          queryClient.refetchQueries('asset_UsageHistories');
        }
      },
    }
  );
};
