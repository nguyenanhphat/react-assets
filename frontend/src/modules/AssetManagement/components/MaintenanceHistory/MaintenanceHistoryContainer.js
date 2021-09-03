import React, { useCallback, useState } from 'react';
import {
  MyTable,
  MyModal,
  MyInput,
  MyButton,
  Icon,
  IconCustom,
} from 'components/atoms';

import MaintenanceHistoryForm from './MaintenanceHistoryForm';
import { Row, Col, Form } from 'antd';
import { useControlTable } from '../../../../hooks/useControlTable';
import { SEARCH_PARAMS_MAINTENANCE_HISTORY } from '../../constants';
import { debounced } from '../../../../utils/common';
import { useGetColumnMaintenanceTable } from './hooks';
import { useControlModalWithForm } from '../../../../hooks/useControlModal';

const MaintenanceHistoryContainer = ({
  assetId,
  suppliers,
  supplierContracts,
  genericOptions,
}) => {
  const [selectedMaintenanceHistory, setSelectedMaintenanceHistory] = useState(
    null
  );
  const [searchOptions, setSearchOptions] = useState(
    SEARCH_PARAMS_MAINTENANCE_HISTORY
  );
  const [maintenanceHistoryForm] = Form.useForm();
  const {
    onSave,
    onAfterSubmittedForm,
    onSaveAndClose,
    setVisibleModal,
    visibleModal,
    onClose,
  } = useControlModalWithForm(
    setSelectedMaintenanceHistory,
    maintenanceHistoryForm
  );

  const controlModal = useCallback(
    (data, isOpen) => {
      setSelectedMaintenanceHistory(data);
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
    { ...SEARCH_PARAMS_MAINTENANCE_HISTORY, assetId },
    'asset_UsageHistories',
    'maintenanceHistories/list',
    SEARCH_PARAMS_MAINTENANCE_HISTORY
  );

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

  const columns = useGetColumnMaintenanceTable(
    onSelectEdit,
    suppliers,
    supplierContracts
  );
  return (
    <div className="maintenance-history">
      <Row className="mb-10" gutter={10} align="middle">
        <Col span={7}>
          <MyInput
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
        data={data?.maintenanceHistories || []}
        pagination={convertedPagination}
        isDescending={convertedSorter.isDescending}
        sortBy={convertedSorter.sortBy}
        onChange={onChangePagination}
        onChangeSort={onChangeSort}
        isHaveBorder
      />

      <MyModal
        title={
          selectedMaintenanceHistory
            ? 'Update Maintenance History'
            : 'Create Maintenance History'
        }
        visible={visibleModal}
        onSave={onSave}
        onSaveAndClose={onSaveAndClose}
        onClose={onClose}
      >
        <MaintenanceHistoryForm
          form={maintenanceHistoryForm}
          onAfterSubmittedForm={onAfterSubmittedForm}
          assetId={assetId}
          selectedMaintenanceHistory={selectedMaintenanceHistory}
          genericOptions={genericOptions}
          suppliers={suppliers}
          supplierContracts={supplierContracts}
        />
      </MyModal>
    </div>
  );
};

export default MaintenanceHistoryContainer;
