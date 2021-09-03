import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { signoutRedirect, signinRedirect } from 'services/user-service';
import { selectUserInfo } from 'states/auth/selectors';
import {
  MyBreadcrumb,
  MyButton,
  MyCard,
  MyCheckbox,
  MyDatepicker,
  MyEditor,
  MyInput,
  MySelectMultiple,
  MySelectSingle,
  MySwitch,
  MyTable,
  MyTag,
  MyTextarea,
  MyUpload,
  MyModal,
} from 'components/atoms';
import { showModalConfirm } from 'utils/modal';
import { notifyError, notifySuccess } from 'utils/notification';
import { Row, Col, Card } from 'antd';
import MyLoading from 'components/atoms/loading';

function Home() {
  const userInfo = useSelector(selectUserInfo());
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    if (userInfo) {
      signoutRedirect(userInfo.id_token);
      return;
    }
    signinRedirect();
  };

  const onConfirm = () => {
    showModalConfirm({
      title: 'Archive comment',
      content: 'Are you sure to archive this comment?',
      onOk: () => {
        console.log('ok');
      },
    });
  };

  const showSuccess = () => {
    notifySuccess();
  };

  const showError = () => {
    notifyError();
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };
  return (
    <Card>
      <h3>Button</h3>
      <MyButton type="btn-primary" onClick={handleLogout}>
        Logout
      </MyButton>

      <h3 className="mt-20">Modal</h3>
      <MyButton onClick={toggleModal}>Toggle Modal</MyButton>
      <MyModal
        title="Test Modal"
        visible={showModal}
        onSave={toggleModal}
        onSaveAndClose={toggleModal}
        onClose={toggleModal}
      >
        <div>Form Content</div>
      </MyModal>

      <h3 className="mt-20">Editor</h3>
      <MyEditor />

      <h3 className="mt-20">Card</h3>
      <MyCard
        title="Title card"
        onSubmit={() => console.log('onSubmit')}
        onSubmitAndClose={() => console.log('onSubmitAndClose')}
        onClose={() => console.log('onClose')}
        isCardBorder
        isShowFooter
      >
        <div className="p-15">Content Card</div>
      </MyCard>

      <h3 className="mt-20">Date picker</h3>
      <MyDatepicker />

      <h3 className="mt-20">Notification</h3>
      <MyButton type="btn-primary" className="mr-10" onClick={showSuccess}>
        Success
      </MyButton>
      <MyButton type="btn-default" onClick={showError}>
        Error
      </MyButton>

      <h3 className="mt-20">Modal confirm</h3>
      <MyButton type="btn-primary" onClick={onConfirm}>
        Show Modal
      </MyButton>

      <h3 className="mt-20">Attachment</h3>
      <Row>
        <Col span={12}>
          <MyUpload />
        </Col>
      </Row>

      <h3 className="mt-20">Table</h3>
      <MyTable />

      <h3 className="mt-20">Tag</h3>
      <MyTag />

      <h3 className="mt-20">Breadcrumb</h3>
      <MyBreadcrumb />

      <h3>Input</h3>
      <Row gutter={12}>
        <Col span={6}>
          <h5>Input text</h5>
          <MyInput />
        </Col>
        <Col span={6}>
          <h5>Input number</h5>
          <MyInput type="number" />
        </Col>
        <Col span={6}>
          <h5>Text area</h5>
          <MyTextarea />
        </Col>
      </Row>
      <h3 className="mt-20">Select single</h3>
      <Row>
        <Col span={6}>
          <MySelectSingle />
        </Col>
      </Row>
      <h3 className="mt-20">Select multiple</h3>
      <Row>
        <Col span={6}>
          <MySelectMultiple />
        </Col>
      </Row>
      <h3 className="mt-20">Checkbox</h3>
      <MyCheckbox />
      <h3 className="mt-20">Switch Button</h3>
      <MySwitch />
      <h3 className="mt-20">Spin</h3>
      <MyLoading title="Loading..." />
    </Card>
  );
}

export default Home;
