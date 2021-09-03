import { useCallback, useMemo } from 'react';
import { ASSET_STATUSES } from '../constants/assetConstants';

export const useDisplayFinPlanOptions = () =>
  useCallback((id, options) => {
    if (id && options?.length) {
      const option = options.find(item => item.id === +id);
      return option?.name || '';
    }
    return '';
  }, []);

export const useDisplayStatusOption = () =>
  useCallback(status => {
    if (status) {
      return ASSET_STATUSES[status].name;
    }
    return '';
  }, []);

export const useGetGenericOptionsByGroup = (group, dataOptions) =>
  useMemo(
    () =>
      dataOptions?.length
        ? dataOptions.filter(item => item.group === group)
        : [],
    [dataOptions, group]
  );
export const useGetSubTypeGenericOptions = (selectedTypes, dataOptions) =>
  useMemo(() => {
    const subTypes = dataOptions.filter(item => item.group === 'subType');
    if (selectedTypes.length > 0) {
      return subTypes.filter(
        item => selectedTypes.indexOf(item?.parent?.id) > -1
      );
    }
    return subTypes;
  }, [dataOptions, selectedTypes]);
