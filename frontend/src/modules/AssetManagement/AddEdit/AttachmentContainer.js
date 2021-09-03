import React from 'react';
import { Col, Row } from 'antd';
import { MyCard, MyUpload } from 'components/atoms';

const AttachmentContainer = ({
  files,
  onFileUploaded,
  onRemoveFile,
  filesUploaded,
  onRemoveUploadedFile,
}) => {
  return (
    <Row className="upload-row" gutter={(24, 24)}>
      <Col span={24}>
        <MyCard title="Attachment" isCardBorder isFixMarginCard>
          <div className="p-15">
            <MyUpload
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
  );
};

export default AttachmentContainer;
