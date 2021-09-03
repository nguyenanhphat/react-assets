import React, { useCallback, useEffect, useState } from 'react';
import {
  MyTable,
  MyModal,
  Icon,
  IconCustom,
  MyButton,
  MyInput,
} from 'components/atoms';
import { Row, Col, Form } from 'antd';
import UsageHistoryForm from './UsageHistoryForm';
import { useControlTable } from '../../../../hooks/useControlTable';
import { SEARCH_PARAMS_USAGE_HISTORY } from '../../constants';
import { debounced } from '../../../../utils/common';
import { useListUsers } from '../../hooks';
import { useControlModalWithForm } from '../../../../hooks/useControlModal';
import { useGetColumnUsageHistoryTable } from './hooks';

const UsageHistoryContainer = ({ assetId, genericOptions }) => {
  const [selectedUsageHistory, setSelectedUsageHistory] = useState(null);
  const [searchOptions, setSearchOptions] = useState(
    SEARCH_PARAMS_USAGE_HISTORY
  );

  const [usageHistoryForm] = Form.useForm();

  const {
    onSave,
    onAfterSubmittedForm,
    onSaveAndClose,
    setVisibleModal,
    visibleModal,
    onClose,
  } = useControlModalWithForm(setSelectedUsageHistory, usageHistoryForm);

  const controlModal = useCallback(
    (data, isOpen) => {
      setSelectedUsageHistory(data);
      setVisibleModal(isOpen);
    },
    [setVisibleModal]
  );

  const onOpenModalToCreate = useCallback(() => {
    controlModal(null, true);
  }, [controlModal]);

  const onSelectEdit = useCallback(
    (key, col) => {
      controlModal(col, true);
    },
    [controlModal]
  );
  const {
    data,
    convertedSorter,
    convertedPagination,
    handleChangeParam,
    onChangePagination,
    onChangeSort,
  } = useControlTable(
    { ...SEARCH_PARAMS_USAGE_HISTORY, assetId },
    'asset_UsageHistories',
    'usageHistories/list',
    SEARCH_PARAMS_USAGE_HISTORY
  );

  const { data: users, refetch: refetchUsers } = useListUsers({
    limit: 1000,
  });

  useEffect(() => {
    refetchUsers().then(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = useCallback(
    name => {
      return value => {
        if (name === 'name') {
          debounced(() => {
            handleChangeParam(name, value);
          });
        } else {
          handleChangeParam(name, value);
        }
        setSearchOptions(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };
    },
    [handleChangeParam]
  );

  const columns = useGetColumnUsageHistoryTable(onSelectEdit);
  return (
    <div className="usage-history">
      <Row className="mb-10" gutter={10} align="middle">
        <Col span={7}>
          <MyInput
            placeholder="Search"
            value={searchOptions.name}
            onChange={onChange('name')}
            prefix={<Icon component={IconCustom.Search} />}
          />
        </Col>
        <Col span={17} className="t-right">
          <MyButton
            type="btn-primary"
            icon={<Icon component={IconCustom.Plus} />}
            onClick={onOpenModalToCreate}
          >
            Create New
          </MyButton>
        </Col>
      </Row>
      <MyTable
        columns={columns}
        data={data?.usageHistories || []}
        pagination={convertedPagination}
        isDescending={convertedSorter.isDescending}
        sortBy={convertedSorter.sortBy}
        onChange={onChangePagination}
        onChangeSort={onChangeSort}
        isHaveBorder
      />
      <MyModal
        title={
          selectedUsageHistory ? 'Update Usage History' : 'Create Usage History'
        }
        visible={visibleModal}
        onSave={onSave}
        onSaveAndClose={onSaveAndClose}
        onClose={onClose}
      >
        <UsageHistoryForm
          form={usageHistoryForm}
          onAfterSubmittedForm={onAfterSubmittedForm}
          assetId={assetId}
          selectedUsageHistory={selectedUsageHistory}
          users={users}
          genericOptions={genericOptions}
        />
      </MyModal>
    </div>
  );
};

export default UsageHistoryContainer;
