import { Col, Form, Row } from 'antd';
import {
  MyDatepicker,
  MyEditor,
  MyInput,
  MySelectSingle,
} from 'components/atoms';
import React, { useCallback, useEffect, useState } from 'react';
import './MaintenanceHistoryForm.scss';
import { useGetGenericOptionsByGroup } from '../../../../hooks/parserOptionItem';
import { useCreateUpdateMaintenanceHistory } from '../../hooks';
import { convertMaintenanceHistoryFormToData } from '../../utils';

const FormUsageMaintenance = ({
  assetId,
  selectedMaintenanceHistory,
  genericOptions,
  suppliers,
  supplierContracts,
  form,
  onAfterSubmittedForm,
}) => {
  const [, forceUpdate] = useState();
  const { mutate } = useCreateUpdateMaintenanceHistory(
    selectedMaintenanceHistory?.id,
    onAfterSubmittedForm
  );
  const currencyUnitOptions = useGetGenericOptionsByGroup(
    'currencyUnit',
    genericOptions
  );
  const onFinish = useCallback(
    values => {
      if (values) {
        const payload = convertMaintenanceHistoryFormToData(assetId, values);
        mutate(payload);
      }
    },
    [assetId, mutate]
  );
  useEffect(() => {
    forceUpdate({});
  }, []);

  useEffect(() => {
    if (selectedMaintenanceHistory) {
      form.setFieldsValue({
        issueDate: selectedMaintenanceHistory.issueDate,
        completedDate: selectedMaintenanceHistory.completedDate,
        supplier: selectedMaintenanceHistory.supplierId
          ? +selectedMaintenanceHistory.supplierId
          : null,
        supplierContract: selectedMaintenanceHistory.supplierContractId
          ? +selectedMaintenanceHistory.supplierContractId
          : null,
        cost: selectedMaintenanceHistory.cost,
        currency: selectedMaintenanceHistory?.costCurrencyUnit?.id || null,
        details: selectedMaintenanceHistory.details,
      });
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMaintenanceHistory]);
  return (
    <div className="usage-maintenance mt-10 mb-10">
      <div className="maintenance-form">
        <Form
          className="form-custom"
          layout="vertical"
          form={form}
          onFinish={onFinish}
          scrollToFirstError
        >
          <Row gutter={10} className="p-20">
            <Col span={12}>
              <Form.Item
                label="Issue Date"
                name="issueDate"
                className="required"
                rules={[
                  { required: true, message: 'Please select issue date' },
                ]}
              >
                <MyDatepicker placeholder={'Select Issue Date'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Completed Date"
                name="completedDate"
                className="pt-3"
              >
                <MyDatepicker placeholder={'Select Complete Date'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Supplier"
                name="supplier"
                className="required"
                rules={[{ required: true, message: 'Please select supplier' }]}
              >
                <MySelectSingle
                  placeholder={'Select Supplier'}
                  options={suppliers || []}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Supplier Contract"
                name="supplierContract"
                className="required"
                rules={[
                  { required: true, message: 'Please enter supplier contract' },
                ]}
              >
                <MySelectSingle
                  placeholder={'Select Supplier Contract'}
                  options={supplierContracts || []}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Cost"
                name="cost"
                className="required"
                rules={[{ required: true, message: 'Please enter cost' }]}
              >
                <MyInput placeholder={'Enter Code'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Currency"
                name="currency"
                className="required"
                rules={[{ required: true, message: 'Please enter currency' }]}
              >
                <MySelectSingle
                  // placeholder={'Select Currency'}
                  options={currencyUnitOptions || []}
                  placeholder="VND"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Details" name="details">
                <MyEditor />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

FormUsageMaintenance.propTypes = {};

export default FormUsageMaintenance;
