import React, { useMemo } from 'react';
import { Col, Form, Row } from 'antd';
import { MyCard, MyInput, MySelectSingle } from 'components/atoms';
import { ASSET_STATUSES } from '../../../constants/assetConstants';

const Information = ({ genericOptions, selectedType, editMode }) => {
  const typeOptions = useMemo(
    () => genericOptions.filter(item => item.group === 'type'),
    [genericOptions]
  );
  const locationOptions = useMemo(
    () => genericOptions.filter(item => item.group === 'location'),
    [genericOptions]
  );
  const subTypeOptions = useMemo(() => {
    const subTypes = genericOptions.filter(item => item.group === 'subType');
    if (selectedType) {
      return subTypes.filter(item => item?.parent?.id === selectedType);
    }
    return subTypes;
  }, [genericOptions, selectedType]);
  const statusOptions = useMemo(
    () => Object.values(ASSET_STATUSES).map(({ id, name }) => ({ id, name })),
    []
  );
  console.log('statusOptions', statusOptions);
  const spanFormItem = useMemo(() => (editMode ? 8 : 12), [editMode]);
  return (
    <Row gutter={(24, 24)}>
      <Col span={24}>
        <MyCard
          className="mb-15"
          title={'General Info'}
          isCardBorder
          isFixMarginCard
        >
          <Row className="p-15" gutter={(24, 24)}>
            <Col span={spanFormItem}>
              <Form.Item
                label="Name"
                name="name"
                className="required"
                rules={[{ required: true, message: 'Please enter name' }]}
              >
                <MyInput placeholder="Enter Name" />
              </Form.Item>
            </Col>
            <Col span={spanFormItem}>
              <Form.Item
                label="Type"
                name="type"
                className="required"
                rules={[{ required: true, message: 'Please choose type' }]}
              >
                <MySelectSingle
                  placeholder="Select Type"
                  options={typeOptions}
                />
              </Form.Item>
            </Col>
            <Col span={spanFormItem}>
              <Form.Item
                label="Sub Type"
                name="subType"
                className="required"
                rules={[{ required: true, message: 'Please choose sub type' }]}
              >
                <MySelectSingle
                  placeholder="Select Sub Type"
                  options={subTypeOptions}
                />
              </Form.Item>
            </Col>
            <Col span={spanFormItem}>
              <Form.Item
                label="Location"
                name="location"
                className="required"
                rules={[{ required: true, message: 'Please choose location' }]}
              >
                <MySelectSingle
                  placeholder="Select Location"
                  options={locationOptions}
                />
              </Form.Item>
            </Col>
            {editMode && (
              <Col span={spanFormItem}>
                <Form.Item
                  label="Status"
                  name="status"
                  className="required"
                  rules={[
                    { required: true, message: 'Please choose location' },
                  ]}
                >
                  <MySelectSingle
                    placeholder="Select status"
                    options={statusOptions}
                  />
                </Form.Item>
              </Col>
            )}
          </Row>
        </MyCard>
      </Col>
    </Row>
  );
};

export default Information;
