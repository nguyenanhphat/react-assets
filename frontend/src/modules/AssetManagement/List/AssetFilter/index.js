import Icon from '@ant-design/icons';
import { Col, Form, Row } from 'antd';
import {
  IconCustom,
  MyButton,
  MyInput,
  MySelectMultiple,
} from 'components/atoms';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { debounced } from 'utils/common';
import Computer from '../../../../components/atoms/icon/computer';
import Config from '../../../../components/atoms/icon/config';
import Infra from '../../../../components/atoms/icon/infra';
import Supplier from '../../../../components/atoms/icon/supplier';
import './style.scss';

const AssetFilter = ({
  dataUsers,
  dataOptions,
  suppliers,
  handleChangeParam,
  handleSearchText,
  searchParams,
  onReset: onResetProp,
}) => {
  const [form] = Form.useForm();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const onReset = useCallback(() => {
    debounced(() => {
      onResetProp();
      form.resetFields();
    });
  }, [form, onResetProp]);

  useEffect(() => {
    if (searchParams) {
      form.setFieldsValue(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeValueFilter = useCallback(
    val => {
      if (val) {
        val.name = val?.name?.trim();
        const valueArray = Object.entries(val);
        for (const valueItem of valueArray) {
          if (valueItem[0] === 'name') {
            debounced(() => {
              handleChangeParam(valueItem[0], valueItem[1]);
            });
          } else {
            handleChangeParam(valueItem[0], valueItem[1]);
          }
        }
        if (val.typeIds) {
          setSelectedTypes(val.typeIds);
        }
      }
    },
    [handleChangeParam]
  );

  const subTypeOptions = useMemo(() => {
    const subTypes = dataOptions.filter(item => item.group === 'subType');
    if (selectedTypes.length > 0) {
      return subTypes.filter(
        item => selectedTypes.indexOf(item?.parent?.id) > -1
      );
    }
    return subTypes;
  }, [dataOptions, selectedTypes]);

  const locationOptions = useMemo(
    () => dataOptions.filter(item => item.group === 'location'),
    [dataOptions]
  );

  const manufactureOptions = useMemo(
    () => dataOptions.filter(item => item.group === 'manufacturer'),
    [dataOptions]
  );

  const typeOptions = useMemo(
    () => dataOptions.filter(item => item.group === 'type'),
    [dataOptions]
  );

  return (
    <div className="container-filter">
      <div className="filter-input">
        <Form
          form={form}
          scrollToFirstError
          onValuesChange={onChangeValueFilter}
          layout="horizontal"
        >
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item name="name">
                <MyInput
                  prefix={<Icon component={IconCustom.Search} />}
                  placeholder="Search"
                  type="text"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="typeIds">
                <MySelectMultiple
                  prefix={<Icon component={Infra} />}
                  placeholder="Select Types"
                  options={typeOptions}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="subTypeIds">
                <MySelectMultiple
                  prefix={<Icon component={Computer} />}
                  placeholder="Select Sub Types"
                  options={subTypeOptions}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="locationIds">
                <MySelectMultiple
                  prefix={<Icon component={IconCustom.Location} />}
                  placeholder="Select Locations"
                  options={locationOptions}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="assigneeIds">
                <MySelectMultiple
                  prefix={<Icon component={IconCustom.Lead} />}
                  placeholder="Select Current Assignees"
                  options={dataUsers}
                  valueSearch={code => handleSearchText(code)}
                  empCode
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="supplierIds">
                <MySelectMultiple
                  prefix={<Icon component={Supplier} />}
                  placeholder="Select Suppliers"
                  options={suppliers || []}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="manufacturerIds">
                <MySelectMultiple
                  prefix={<Icon component={Config} />}
                  placeholder="Select Manufacturers"
                  options={manufactureOptions}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="currentAssigneeIds">
                <MySelectMultiple
                  prefix={<Icon component={IconCustom.Lead} />}
                  placeholder="Select Assignees (Any time)"
                  options={dataUsers}
                  empCode
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className="mt-10 t-right">
          <MyButton
            type="btn-outline"
            icon={<Icon component={IconCustom.Refresh} />}
            onClick={onReset}
          >
            Reset
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default AssetFilter;
