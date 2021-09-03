import { Col, Form, Row } from 'antd';
import {
  MyCard,
  MyDatepicker,
  MyEditor,
  MySelectSingle,
  MyUpload,
} from 'components/atoms';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './UsageHistoryForm.scss';
import { useGetGenericOptionsByGroup } from '../../../../hooks/parserOptionItem';
import { useCreateUpdateUsageHistory } from '../../hooks';
import {
  convertAttachmentRawToData,
  convertUsageHistoryFormToData,
} from '../../utils';
import { useControlUpload } from '../../../../components/atoms/upload/hooks';

const FormUsageHistory = ({
  form,
  onAfterSubmittedForm,
  assetId,
  selectedUsageHistory,
  users,
  genericOptions,
}) => {
  const [, forceUpdate] = useState();
  const { mutate } = useCreateUpdateUsageHistory(
    selectedUsageHistory?.id,
    onAfterSubmittedForm
  );
  const {
    files,
    onRemoveFile,
    onFileUploaded,
    attachments,
    filesUploaded,
    onRemoveUploadedFile,
  } = useControlUpload(selectedUsageHistory?.handoverDocuments);

  useEffect(() => {
    forceUpdate({});
  }, []);

  useEffect(() => {
    if (selectedUsageHistory) {
      form.setFieldsValue({
        assignee: selectedUsageHistory.assigneeId,
        location: selectedUsageHistory.locationId,
        startDate: selectedUsageHistory.usageFrom,
        endDate: selectedUsageHistory.usageTo,
        handoverContent: selectedUsageHistory.handoverContent,
      });
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUsageHistory]);

  const onFinish = useCallback(
    values => {
      const payload = convertUsageHistoryFormToData(assetId, values);
      payload.attachmentIds = convertAttachmentRawToData(
        attachments,
        filesUploaded
      );
      mutate(payload);
    },
    [assetId, attachments, filesUploaded, mutate]
  );
  const userOptions = useMemo(() => {
    if (users?.length) {
      return users.map(item => ({
        id: item.id,
        name: `${item.firstName} ${item.lastName}`,
      }));
    }
    return [];
  }, [users]);

  const locationOptions = useGetGenericOptionsByGroup(
    'location',
    genericOptions
  );
  return (
    <div className="usage-history mt-10 mb-10">
      <div className="history-form">
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
                label="Assignee"
                name="assignee"
                className="required"
                rules={[{ required: true, message: 'Please select assignee' }]}
              >
                <MySelectSingle
                  placeholder="Select Assignee"
                  options={userOptions}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Location"
                name="location"
                className="required"
                rules={[{ required: true, message: 'Please enter location' }]}
              >
                <MySelectSingle
                  placeholder="Select Location"
                  options={locationOptions}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Start Date"
                name="startDate"
                className="required"
                rules={[
                  { required: true, message: 'Please select start date' },
                ]}
              >
                <MyDatepicker placeholder="Select Start Date" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="End Date" name="endDate" className="pt-3">
                <MyDatepicker placeholder="Select End Date" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Handover Content"
                name="handoverContent"
                className="required"
                rules={[
                  { required: true, message: 'Please enter handover content' },
                ]}
              >
                <MyEditor placeholder="Type Something" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <MyCard title="Attachment" isCardBorder>
                <div className="p-15">
                  <MyUpload
                    isColumnDisplay
                    files={files}
                    onFileUploaded={onFileUploaded}
                    onRemoveFile={onRemoveFile}
                    filesUploaded={filesUploaded}
                    onRemoveUploadedFile={onRemoveUploadedFile}
                  />
                </div>
              </MyCard>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

FormUsageHistory.propTypes = {};

export default FormUsageHistory;
