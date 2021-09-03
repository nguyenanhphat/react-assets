import { Col, Row } from 'antd';
import { MyCard } from 'components/atoms';
import React from 'react';
import { formatTime } from 'utils/time';

const SpecificationInfo = ({ assetDetail }) => {
  return (
    <MyCard className="mt-20" title="Specification" isCardBorder>
      <div className="p-15">
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Manufacturer
          </Col>
          <Col span={16}>{assetDetail?.specification?.manufacturer?.name}</Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Model
          </Col>
          <Col span={16}>{assetDetail?.specification?.model}</Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Serial number
          </Col>
          <Col span={16}>{assetDetail?.specification?.serialNumber}</Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            UUID
          </Col>
          <Col span={16}>{assetDetail?.specification?.uuid}</Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Warranty Period
          </Col>
          <Col span={16}>
            {assetDetail?.specification?.warrantyPeriod
              ? formatTime(assetDetail?.specification?.warrantyPeriod)
              : ''}
          </Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Technical specification
          </Col>
          <Col span={16}>
            {assetDetail?.specification?.technicalSpecification}
          </Col>
        </Row>
      </div>
    </MyCard>
  );
};

export default SpecificationInfo;
