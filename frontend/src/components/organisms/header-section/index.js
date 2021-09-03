import React from 'react';
import { Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { MyButton, Icon, IconCustom } from 'components/atoms';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './styles.scss';

const HeaderSection = ({
  className,
  title,
  onAction,
  textButton,
  iconButton,
  onGoBack,
  onlyTitle,
  extraText,
}) => {
  return (
    <>
      {onlyTitle ? (
        <Row className={cn('header-section-custom', className)}>
          <Col className="col-text" span={12}>
            {onGoBack && (
              <ArrowLeftOutlined className="icon-back" onClick={onGoBack} />
            )}
            <span>{title}</span>
          </Col>
          {onAction && (
            <Col className="col-button" span={12}>
              <div>
                <MyButton
                  onClick={onAction}
                  type="btn-primary"
                  icon={iconButton}
                >
                  {textButton}
                </MyButton>
              </div>
            </Col>
          )}
        </Row>
      ) : (
        <Row className={cn('header-section-custom', className)}>
          <Col className="col-text" span={12}>
            {onGoBack && (
              <ArrowLeftOutlined className="icon-back" onClick={onGoBack} />
            )}
            <span>{title}</span>
          </Col>
          {onAction && (
            <Col className="col-button" span={12}>
              <div>
                {extraText}
                <MyButton
                  onClick={onAction}
                  type="btn-primary"
                  icon={iconButton}
                >
                  {textButton}
                </MyButton>
              </div>
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

HeaderSection.propTypes = {
  className: PropTypes.string,
  onAction: PropTypes.func,
  onGoBack: PropTypes.func,
  textButton: PropTypes.string,
  iconButton: PropTypes.element,
  title: PropTypes.string,
};

HeaderSection.defaultProps = {
  textButton: 'Create New',
  iconButton: <Icon component={IconCustom.Plus} />,
  title: 'Assets',
  onlyTitle: false,
};

export default HeaderSection;
