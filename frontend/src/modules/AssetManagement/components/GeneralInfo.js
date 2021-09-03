import { Col, Row } from 'antd';
import { MyCard } from 'components/atoms';
import React, { useCallback } from 'react';
import { formatTime } from 'utils/time';
import Status from './Status/Status';

const GeneralInfo = ({ assetDetail }) => {
  console.log('assetDetail', assetDetail);
  const displayAttachments = useCallback(attachments => {
    return attachments.map(item => (
      <a href={item.attachmentLink} target="_blank" key={item.id}>
        {item.name}
      </a>
    ));
  }, []);
  return (
    <MyCard title="General Info" isCardBorder>
      <div className="p-15">
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Name
          </Col>
          <Col span={16}>{assetDetail?.name || ''}</Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Type
          </Col>
          <Col span={16}>{assetDetail?.type?.name || ''}</Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Active Date
          </Col>
          <Col span={16}>
            {assetDetail?.activeTime ? formatTime(assetDetail?.activeTime) : ''}
          </Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            SKU
          </Col>
          <Col span={16}>{assetDetail?.sku || ''}</Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Assignee
          </Col>
          <Col span={16}>
            {`${assetDetail?.assignee?.firstName || ''} ${
              assetDetail?.assignee?.lastName || ''
            }`}
          </Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Status
          </Col>
          <Col span={16}>
            <Status status={assetDetail?.status} />
          </Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Attachment(s)
          </Col>
          <Col span={16}>
            {assetDetail?.attachments?.length > 0
              ? displayAttachments(assetDetail.attachments)
              : ''}
          </Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Photo(s)
          </Col>
          <Col span={16}>
            {assetDetail?.attachments?.length > 0
              ? displayAttachments(assetDetail.attachments)
              : ''}
          </Col>
        </Row>
      </div>
    </MyCard>
  );
};

export default GeneralInfo;
