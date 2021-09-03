import React from 'react';
import { Form } from 'antd';
import {
  MySelectMultiple,
  MyCheckbox,
  MyInput,
  MyButton,
  Icon,
  IconCustom,
} from 'components/atoms';
// import {
//   UsageMaintenance,
//   UsageHistory,
//   CreateUsageHistory,
//   UpdateAsset,
// } from '../../../modules/AssetManagement/components';
const ReportPage = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log(values);
  };
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item label="Input text" name="inputText">
          <MyInput />
        </Form.Item>
        <Form.Item label="Select multiple" name="selectMultiple">
          <MySelectMultiple />
        </Form.Item>
        <Form.Item label="Checkbox" name="checkbox">
          <MyCheckbox isApplyStyleDisabled={false} />
        </Form.Item>
        <Form.Item>
          <MyButton
            icon={<Icon component={IconCustom.Edit} />}
            type="btn-primary"
            className="mr-10"
          >
            My Button
          </MyButton>

          <MyButton
            icon={<Icon component={IconCustom.Edit} />}
            type="btn-outline"
          >
            Reset
          </MyButton>
        </Form.Item>
      </Form>
      <hr />
      <h3>Component Usage History</h3>
      {/*<UsageHistory />*/}
      <hr />
      <h3>Component Usage Maintenance</h3>
      {/*<UsageMaintenance />*/}
      <hr />
      <h3>Component Usage History</h3>
      {/*<CreateUsageHistory />*/}
      <hr />
      <h3>Component Update Asset</h3>
      {/*<UpdateAsset />*/}
      <hr />
    </>
  );
};

export default ReportPage;
