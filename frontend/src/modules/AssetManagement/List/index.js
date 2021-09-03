import { LoadingOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { MyBreadcrumb, MyCard } from 'components/atoms';
import MyLoading from 'components/atoms/loading';
import { HeaderSection } from 'components/organisms';
import { get } from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useControlTable } from '../../../hooks/useControlTable';
import { ASSET_ADD_EDIT, HOME } from '../../../routers/route-path';
import { saveSearchParams } from '../actions';
import { useGenericOption, useGetSuppliers, useListUsers } from '../hooks';
import { REDUX_NAME, SEARCH_PARAMS } from './../constants';
import AssetFilter from './AssetFilter';
import AssetTable from './AssetTable';

const AssetListContainer = ({
  searchParams: searchParamsProp,
  saveSearchParams: saveSearchParamsProp,
}) => {
  const history = useHistory();
  const {
    data,
    isLoading,
    refetch,
    convertedSorter,
    convertedPagination,
    handleChangeParam,
    onChangePagination,
    onChangeSort,
    searchParams,
    onReset,
  } = useControlTable(
    searchParamsProp,
    'asset_assets',
    'asset/list',
    SEARCH_PARAMS
  );
  const {
    data: dataOptions,
    refetch: refetchGenericOptions,
  } = useGenericOption();
  const { data: dataUser, refetch: refetchUsers } = useListUsers({
    limit: 1000,
  });
  const { data: suppliers, refetch: refetchSuppliers } = useGetSuppliers();
  useEffect(() => {
    refetch().then(() => {});
    refetchUsers().then(() => {});
    refetchGenericOptions().then(() => {});
    refetchSuppliers().then(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    saveSearchParamsProp(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (isLoading) {
    return (
      <MyLoading
        icon={
          <LoadingOutlined twoToneColor="#52c41a" style={{ fontSize: 24 }} />
        }
        title="Loading..."
      />
    );
  }
  return (
    <Row>
      <Col span={24}>
        <MyBreadcrumb
          path={[{ name: 'Home', link: HOME }, { name: 'Assets' }]}
        />
      </Col>
      <Col span={24}>
        <MyCard>
          <HeaderSection
            className="mb-20"
            onAction={() => history.push(ASSET_ADD_EDIT.replace(':id', 'new'))}
          />
          <AssetFilter
            dataOptions={dataOptions || []}
            suppliers={suppliers || []}
            dataUsers={dataUser || []}
            searchParams={searchParams}
            handleChangeParam={handleChangeParam}
            onReset={onReset}
          />
          <AssetTable
            onChangePagination={onChangePagination}
            onChangeSort={onChangeSort}
            pagination={convertedPagination}
            sorter={convertedSorter}
            data={data?.assets || []}
            suppliers={suppliers || []}
          />
        </MyCard>
      </Col>
    </Row>
  );
};
const mapStateToProps = state => {
  return {
    searchParams: get(state, `${REDUX_NAME}.searchParams`, {}),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveSearchParams: bindActionCreators(saveSearchParams, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AssetListContainer);
