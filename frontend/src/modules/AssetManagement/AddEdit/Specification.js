import React, { useMemo } from 'react';
import { Col, Form, Row } from 'antd';
import {
  MyCard,
  MyDatepicker,
  MyInput,
  MySelectSingle,
  MyTextarea,
} from 'components/atoms';

const Specification = ({ genericOptions }) => {
  const manufacturerOptions = useMemo(
    () => genericOptions.filter(item => item.group === 'manufacturer'),
    [genericOptions]
  );
  return (
    <Row gutter={(24, 24)}>
      <Col span={24}>
        <MyCard
          className="mb-15"
          title={'Specification'}
          isCardBorder
          isFixMarginCard
        >
          <Row className="p-15" gutter={(24, 24)}>
            <Col span={8}>
              <Form.Item
                label="Manufacturer"
                name="manufacturer"
                className="required"
                rules={[
                  {
                    required: true,
                    message: 'Please Select manufacturer',
                  },
                ]}
              >
                <MySelectSingle
                  placeholder="Select Manufacturer"
                  options={manufacturerOptions}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Model"
                name="model"
                className="required"
                rules={[{ required: true, message: 'Please enter model' }]}
              >
                <MyInput placeholder="Enter Model" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Serial Number"
                name="serialNumber"
                className="required"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Serial number',
                  },
                ]}
              >
                <MyInput placeholder="Enter Serial Number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="UUID"
                name="uuid"
                className="required"
                rules={[{ required: true, message: 'Please enter uuid' }]}
              >
                <MyInput placeholder="Enter UUID" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Warranty Period"
                name="warrantyPeriod"
                className="required"
                rules={[
                  {
                    required: true,
                    message: 'Please enter warranty period',
                  },
                ]}
              >
                <MyDatepicker placeholder="Select Warranty Period" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Technical Specification"
                name="technicalSpecification"
                className="required"
                rules={[
                  {
                    required: true,
                    message: 'Please enter technical specification',
                  },
                ]}
              >
                <MyTextarea placeholder="Type Something" />
              </Form.Item>
            </Col>
          </Row>
        </MyCard>
      </Col>
    </Row>
  );
};

export default Specification;
