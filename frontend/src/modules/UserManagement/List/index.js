import { Col, Row } from 'antd';
import cn from 'classnames';
import { Icon, IconCustom, MyBreadcrumb, MyCard } from 'components/atoms';
import { HeaderSection } from 'components/organisms';
import dateFormat from 'date-fns/format';
import React, { useCallback, useEffect, useState } from 'react';
import { HOME } from 'routers/route-path';
import { useSyncUserFromIdentity } from './hook';
import UserFilter from './UserFilter';
import styles from './UserManagementList.module.scss';
import UserTable from './UserTable';
import { useControlTable } from '../../../hooks/useControlTable';

const DEFAULT_PAGINATION = {
  //pagination
  page: 0,
  limit: 10,
  total: 40,
  // sorter
  sortParam: 'id',
  sortOrder: 'DESC',
};
const SEARCH_PARAMS = {
  name: '',
  isActive: true,
  ...DEFAULT_PAGINATION,
};

const ListContainer = () => {
  const [lastSync, setLastSync] = useState(null);
  const {
    refetch: syncUserFromIdentity,
  } = useSyncUserFromIdentity(value => {});
  const {
    data,
    refetch,
    convertedSorter,
    convertedPagination,
    handleChangeParam,
    onChangePagination,
    onChangeSort,
    searchParams,
  } = useControlTable(SEARCH_PARAMS, 'users', 'user', SEARCH_PARAMS);

  useEffect(() => {
    if (data) {
      if (data.users.length) {
        setLastSync(new Date(data.users[0].lastSyncDate));
      }
    }
  }, [data]);

  const onSyncUser = useCallback(() => {
    syncUserFromIdentity().then(res => {
      refetch().then(res => {});
    });
  }, [syncUserFromIdentity, refetch]);
  return (
    <Row>
      <Col span={24}>
        <MyBreadcrumb
          path={[{ name: 'Home', link: HOME }, { name: 'Users' }]}
        />
      </Col>
      <Col span={24}>
        <MyCard>
          <HeaderSection
            title="Users"
            className="mb-20"
            onAction={onSyncUser}
            iconButton={
              <Icon
                className={cn(styles.buttonIcon)}
                component={IconCustom.Refresh}
              />
            }
            textButton="Sync from STS Identity"
            extraText={
              <span className={cn(styles.operationButton)}>
                Last sync:{' '}
                <b>
                  {lastSync
                    ? dateFormat(lastSync, 'dd MMM yyyy hh:mm a')
                    : null}
                </b>
              </span>
            }
          />
          <UserFilter
            searchParams={searchParams}
            handleChangeParam={handleChangeParam}
          />
          <UserTable
            users={data?.users || []}
            pagination={convertedPagination}
            sorter={convertedSorter}
            onChangePagination={onChangePagination}
            onChangeSort={onChangeSort}
          />
        </MyCard>
      </Col>
    </Row>
  );
};

export default ListContainer;
