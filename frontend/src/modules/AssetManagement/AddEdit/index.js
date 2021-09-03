import { Col, Form, Row } from 'antd';
import { MyBreadcrumb, MyButton, MyCard } from 'components/atoms';
import { HeaderSection } from 'components/organisms';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ASSETS, HOME } from 'routers/route-path';
import {
  useAssetDetail,
  useGenericOption,
  useListUsers,
  useCreateUpdateAsset,
} from '../hooks';
import Information from './Information';
import Specification from './Specification';
import PurchaseContainer from './PurchaseContainer';
import AttachmentContainer from './AttachmentContainer';
import {
  convertAssetDetailDataToForm,
  convertAssetDetailFormToData,
  convertAttachmentRawToData,
} from '../utils';
import { useControlUpload } from '../../../components/atoms/upload/hooks';

const AssetCreateEditContainer = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { id } = useParams();
  const editMode = useMemo(() => id !== 'new' && id !== '', [id]);
  const [selectedType, setSelectedType] = useState(null);
  const [closeAfterSave, setCloseAfterSave] = useState(false);

  const {
    data: dataOptions,
    refetch: refetchGenericOptions,
  } = useGenericOption();
  const { refetch: refetchUsers } = useListUsers({
    limit: 1000,
  });
  const { data: assetDetail, refetch: getAssetDetail } = useAssetDetail(id);
  const { mutate } = useCreateUpdateAsset(id, closeAfterSave);
  const {
    files,
    onRemoveFile,
    onFileUploaded,
    attachments,
    filesUploaded,
    onRemoveUploadedFile,
  } = useControlUpload(assetDetail?.attachments);
  useEffect(() => {
    refetchUsers().then(() => {});
    refetchGenericOptions().then(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (editMode) {
      getAssetDetail().then(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);
  useEffect(() => {
    if (assetDetail) {
      const formData = convertAssetDetailDataToForm(assetDetail);
      form.setFieldsValue(formData);
      setSelectedType(formData.type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetDetail]);

  const onFinish = useCallback(
    values => {
      const payload = convertAssetDetailFormToData(values);
      payload.attachmentIds = convertAttachmentRawToData(
        attachments,
        filesUploaded
      );
      mutate(payload);
    },
    [attachments, filesUploaded, mutate]
  );

  const onFormChangeValue = useCallback(
    val => {
      if (val && val.type) {
        if (val.type !== selectedType) {
          form.setFieldsValue({ subType: null });
        }
        setSelectedType(val.type);
      }
    },
    [form, selectedType]
  );

  const onSaveAndClose = useCallback(() => {
    setCloseAfterSave(true);
    form.submit();
  }, [form]);

  const onSave = useCallback(() => {
    setCloseAfterSave(false);
    form.submit();
  }, [form]);

  return (
    <Row>
      <MyBreadcrumb
        path={[
          { name: 'Home', link: HOME },
          { name: 'Assets', link: ASSETS },
          { name: editMode ? 'Update Asset' : 'Create New Asset' },
        ]}
      />

      <Col span={24}>
        <MyCard>
          <HeaderSection
            onGoBack={() => history.push(ASSETS)}
            title={editMode ? 'Update Asset' : 'Create New Asset'}
            className="mb-20"
          />
          <Form
            className="form-custom"
            layout="vertical"
            form={form}
            onFinish={onFinish}
            onValuesChange={onFormChangeValue}
            scrollToFirstError
          >
            <Information
              genericOptions={dataOptions || []}
              selectedType={selectedType}
              editMode={editMode}
            />
            <Specification genericOptions={dataOptions || []} />
            <PurchaseContainer genericOptions={dataOptions || []} />
            <AttachmentContainer
              filesUploaded={filesUploaded}
              files={files}
              onFileUploaded={onFileUploaded}
              onRemoveFile={onRemoveFile}
              onRemoveUploadedFile={onRemoveUploadedFile}
            />
            <div className="footer-card-custom mt-20">
              <Form.Item shouldUpdate>
                {() => (
                  <>
                    <MyButton
                      className="mr-10"
                      type="btn-primary"
                      htmlType="button"
                      onClick={onSave}
                    >
                      Save
                    </MyButton>

                    <MyButton
                      className="mr-10"
                      type="btn-primary"
                      htmlType="button"
                      onClick={onSaveAndClose}
                    >
                      Save & Close
                    </MyButton>

                    <MyButton
                      htmlType="button"
                      onClick={() => history.push(ASSETS)}
                    >
                      Cancel
                    </MyButton>
                  </>
                )}
              </Form.Item>
            </div>
          </Form>
        </MyCard>
        {/* infomation */}
      </Col>
    </Row>
  );
};

export default AssetCreateEditContainer;
