import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import axios from '../utils/axios';

export const useControlTable = (
  searchParamsInitial,
  queryKey,
  apiUrl,
  baseSearchParams
) => {
  const [searchParams, setSearchParams] = useState(searchParamsInitial);
  const [total, setTotal] = useState(0);
  const { data, isLoading, refetch } = useQuery(
    queryKey,
    async () => {
      const searchOptions = {};
      if (searchParams) {
        for (const pramItem of Object.entries(searchParams)) {
          const [key, value] = pramItem;
          searchOptions[key] = Array.isArray(value)
            ? JSON.stringify(value)
            : value;
        }
      }
      const { data } = await axios.get(apiUrl, {
        params: {
          ...searchOptions,
        },
      });
      return data?.data || null;
    },
    { enabled: false }
  );

  useEffect(() => {
    if (data) {
      setTotal(data.count);
    }
  }, [data]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleChangeParam = useCallback(
    (key, value) => {
      setSearchParams(prevState => ({
        ...prevState,
        [key]: value,
        page: 0,
      }));
    },
    [setSearchParams]
  );

  const onChangePagination = useCallback(
    value => {
      const { current, pageSize, total } = value;
      const currentPage = pageSize !== searchParams.limit ? 0 : current - 1;
      setSearchParams(prevState => ({
        ...prevState,
        page: currentPage,
        limit: pageSize,
      }));
      setTotal(total);
    },
    [searchParams]
  );

  const onChangeSort = useCallback(value => {
    const { isDescending, sortBy } = value;
    setSearchParams(prevState => ({
      ...prevState,
      sortOrder: isDescending ? 'DESC' : 'ASC',
      sortParam: sortBy,
    }));
  }, []);

  const convertedPagination = useMemo(
    () => ({
      current: searchParams.page + 1,
      pageSize: searchParams.limit,
      total: total,
    }),
    [searchParams, total]
  );
  const convertedSorter = useMemo(
    () => ({
      isDescending: searchParams.sortOrder === 'DESC',
      sortBy: searchParams.sortParam,
    }),
    [searchParams]
  );

  const onReset = useCallback(() => {
    setSearchParams(baseSearchParams);
  }, [baseSearchParams]);

  return {
    data,
    convertedPagination,
    convertedSorter,
    onChangeSort,
    onChangePagination,
    handleChangeParam,
    isLoading,
    refetch,
    searchParams,
    onReset,
  };
};
