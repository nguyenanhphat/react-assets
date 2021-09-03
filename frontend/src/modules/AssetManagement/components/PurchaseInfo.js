import { Col, Row } from 'antd';
import { MyCard } from 'components/atoms';
import React from 'react';
import { formatCurrencyVnd } from 'utils/common';
import { formatTime } from 'utils/time';
import { useDisplayFinPlanOptions } from '../../../hooks/parserOptionItem';
import PurchaseStatus from '../components/Status/PurchaseStatus';

const PurchaseInfoContainer = ({
  assetDetail,
  suppliers,
  supplierContracts,
}) => {
  const displayFinPlanOptions = useDisplayFinPlanOptions();
  return (
    <MyCard className="mt-20" title="Purchase" isCardBorder>
      <div className="p-15">
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Purchase State
          </Col>
          <Col span={16}>
            <PurchaseStatus status={assetDetail?.purchase?.state} />
          </Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Purchase Value
          </Col>
          <Col span={16}>
            {assetDetail?.purchase?.cost
              ? formatCurrencyVnd(assetDetail?.purchase?.cost)
              : ''}
          </Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Current Value
          </Col>
          <Col span={16}>
            {assetDetail?.currentValue
              ? formatCurrencyVnd(assetDetail?.currentValue)
              : ''}
          </Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Purchasing Date
          </Col>
          <Col span={16}>
            {assetDetail?.purchase?.time
              ? formatTime(assetDetail?.purchase?.time)
              : ''}
          </Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Supplier
          </Col>
          <Col span={16}>
            {displayFinPlanOptions(
              assetDetail?.purchase?.supplierId,
              suppliers
            )}
          </Col>
        </Row>
        <Row gutter={10} className="line-item">
          <Col span={8} className="label">
            Supplier Contract
          </Col>
          <Col span={16}>
            {displayFinPlanOptions(
              assetDetail?.purchase?.supplierContractId,
              supplierContracts
            )}
          </Col>
        </Row>
      </div>
    </MyCard>
  );
};
export default PurchaseInfoContainer;
