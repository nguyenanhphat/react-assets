import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col } from 'antd';
import {
  MyBreadcrumb,
  MyCard,
  Icon,
  IconCustom,
  MyTab,
} from 'components/atoms';
import { HOME, ASSETS, ASSET_PROPERTY } from 'routers/route-path';
import { HeaderSection } from 'components/organisms';
import { useHistory, useParams } from 'react-router-dom';
import GeneralInfo from '../components/GeneralInfo';
import PurchaseInfo from '../components/PurchaseInfo';
import SpecificationInfo from '../components/SpecificationInfo';
import UsageHistoryContainer from '../components/UsageHistory/UsageHistoryContainer';
import MaintenanceHistoryContainer from '../components/MaintenanceHistory/MaintenanceHistoryContainer';
import { useQuery } from 'hooks';
import { VIEW_PROPERTY_ASSET } from '../constants';
import './styles.scss';
import {
  useAssetDetail,
  useGenericOption,
  useGetSupplierContracts,
  useGetSuppliers,
} from '../hooks';
import { ASSET_ADD_EDIT } from '../../../routers/route-path';

const AssetPropertyPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const typeView = useQuery().get('view');
  const [tabActive, setTabActive] = useState(null);

  const { data: assetDetail, refetch: getAssetDetail } = useAssetDetail(id);
  const { data: suppliers, refetch: refetchSuppliers } = useGetSuppliers();
  const {
    data: supplierContracts,
    refetch: refetchSupplierContracts,
  } = useGetSupplierContracts();
  const {
    data: genericOptions,
    refetch: refetchGenericOptions,
  } = useGenericOption();

  useEffect(() => {
    getAssetDetail().then(() => {});
    refetchSuppliers().then(() => {});
    refetchSupplierContracts().then(() => {});
    refetchGenericOptions().then(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTabActive(typeView || VIEW_PROPERTY_ASSET.USAGE);
  }, [typeView]);

  const handleSwitchTab = key => {
    history.push(`${ASSET_PROPERTY.replace(':id', id)}?view=${key}`);
  };

  const onGoToEdit = useCallback(() => {
    history.push(`${ASSET_ADD_EDIT.replace(':id', id)}`);
  }, [history, id]);

  return (
    <Row className="asset-property-page">
      <MyBreadcrumb
        path={[
          { name: 'Home', link: HOME },
          { name: 'Assets', link: ASSETS },
          { name: 'Asset Properties' },
        ]}
      />

      <Col span={24}>
        <MyCard>
          <Row className="header">
            <Col span={8} className="col-left br-1 bb-1">
              <HeaderSection
                title="Asset Properties"
                onGoBack={() => history.push(ASSETS)}
              />
              <Icon onClick={onGoToEdit} component={IconCustom.Edit} />
            </Col>
            <Col span={16} className="col-right bb-1">
              <MyTab
                onChange={handleSwitchTab}
                tabActive={tabActive}
                tabs={[
                  { name: 'Usage History', key: 'usage' },
                  { name: 'Maintenance History', key: 'maintenance' },
                ]}
              />
            </Col>
          </Row>

          <Row className="content">
            <Col span={8} className="p-20 br-1">
              <GeneralInfo assetDetail={assetDetail} />
              <SpecificationInfo assetDetail={assetDetail} />
              <PurchaseInfo
                assetDetail={assetDetail}
                suppliers={suppliers}
                supplierContracts={supplierContracts}
              />
            </Col>

            <Col span={16} className="p-20">
              {tabActive === VIEW_PROPERTY_ASSET.USAGE && (
                <UsageHistoryContainer
                  assetId={id}
                  genericOptions={genericOptions}
                />
              )}
              {tabActive === VIEW_PROPERTY_ASSET.MAINTENANCE && (
                <MaintenanceHistoryContainer
                  assetId={id}
                  suppliers={suppliers}
                  supplierContracts={supplierContracts}
                  genericOptions={genericOptions}
                />
              )}
            </Col>
          </Row>
        </MyCard>
      </Col>
    </Row>
  );
};

export default AssetPropertyPage;
