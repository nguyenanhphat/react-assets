import React, { useEffect, useMemo } from 'react';
import { Col, Form, Row } from 'antd';
import {
  MyCard,
  MyDatepicker,
  MyInput,
  MySelectSingle,
} from 'components/atoms';
import { PURCHASING_STATE } from '../../../constants/assetConstants';
import { useGetSupplierContracts, useGetSuppliers } from '../hooks';

const PurchaseContainer = ({ genericOptions }) => {
  const { data: dataSuppliers, refetch: refetchSuppliers } = useGetSuppliers();
  const {
    data: dataSupplierContracts,
    refetch: refetchSupplierContracts,
  } = useGetSupplierContracts();
  useEffect(() => {
    refetchSuppliers().then(() => {});
    refetchSupplierContracts().then(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const currencyOptions = useMemo(
    () => genericOptions.filter(item => item.group === 'currencyUnit'),
    [genericOptions]
  );
  const purchasingStateOptions = useMemo(
    () =>
      Object.values(PURCHASING_STATE).map(({ id, name }) => ({
        id,
        name,
      })),
    []
  );
  return (
    <Row gutter={(24, 24)}>
      <Col span={24}>
        <MyCard
          className="mb-15"
          title={'Purchase'}
          isCardBorder
          isFixMarginCard
        >
          <Row className="p-15" gutter={(24, 24)}>
            <Col span={8}>
              <Form.Item
                label="Purchasing State"
                name="purchasingState"
                className="required"
                rules={[
                  {
                    required: true,
                    message: 'Please enter purchasing state',
                  },
                ]}
              >
                <MySelectSingle
                  placeholder="Select Purchasing State "
                  options={purchasingStateOptions}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Purchasing Value"
                name="purchasingValue"
                className="required"
                rules={[
                  {
                    required: true,
                    message: 'Please enter purchasing value',
                  },
                ]}
              >
                <MyInput type="number" placeholder="Enter Purchasing Value" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Currency"
                name="currency"
                className="required"
                rules={[
                  {
                    required: true,
                    message: 'Please enter currency',
                  },
                ]}
              >
                <MySelectSingle options={currencyOptions} placeholder="VND" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Purchasing Date"
                name="purchasingDate"
                className="required"
                rules={[
                  {
                    required: true,
                    message: 'Please enter purchasing date',
                  },
                ]}
              >
                <MyDatepicker placeholder="Select Purchasing Date" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Supplier"
                name="supplier"
                className="required"
                rules={[
                  {
                    required: true,
                    message: 'Please select supplier ',
                  },
                ]}
              >
                <MySelectSingle
                  placeholder="Select Supplier"
                  options={dataSuppliers || []}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Supplier Contract"
                name="supplierContract"
                className="required"
                rules={[
                  {
                    required: true,
                    message: 'Please enter supplier contract',
                  },
                ]}
              >
                <MySelectSingle
                  placeholder="Enter Supplier Contract"
                  options={dataSupplierContracts || []}
                />
              </Form.Item>
            </Col>
          </Row>
        </MyCard>
      </Col>
    </Row>
  );
};

export default PurchaseContainer;
