import { MyTable } from 'components/atoms';
import { VIEW_PROPERTY_ASSET } from '../../constants';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ASSET_PROPERTY, ASSET_ADD_EDIT } from '../../../../routers/route-path';
import { useGetColumnAssetManagementTable } from '../hooks';

const AssetList = ({
  pagination,
  onChangePagination,
  data,
  onChangeSort,
  sorter,
  suppliers,
}) => {
  const history = useHistory();

  const handleSelect = useCallback(
    (key, col) => {
      if (key === VIEW_PROPERTY_ASSET.EDIT) {
        history.push(`${ASSET_ADD_EDIT.replace(':id', col?.id)}`);
        return;
      }
      // View properties
      history.push(`${ASSET_PROPERTY.replace(':id', col?.id)}?view=${key}`);
    },
    [history]
  );
  const columns = useGetColumnAssetManagementTable(
    handleSelect,
    suppliers || []
  );

  return (
    <div>
      <MyTable
        data={data}
        columns={columns}
        pagination={pagination}
        isDescending={sorter.isDescending}
        sortBy={sorter.sortBy}
        onChange={onChangePagination}
        onChangeSort={onChangeSort}
      />
    </div>
  );
};

AssetList.propTypes = {};

export default AssetList;
