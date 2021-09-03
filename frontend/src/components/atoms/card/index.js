import { Card } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import MyButton from '../button';
import './styles.scss';

const MyCard = ({
  children,
  title,
  isResetPaddingBody,
  className,
  isCardBorder,
  isFixMarginCard,
  isShowFooter,
  textSubmit,
  textCancel,
  textSubmitAndCancel,
  onSubmit,
  onClose,
  onSubmitAndClose,
}) => {
  return (
    <Card
      className={cn(
        'my-card-custom',
        className,
        isResetPaddingBody && 'reset-body-padding',
        isCardBorder && 'card-border',
        isFixMarginCard && 'fix-body-margin'
      )}
      title={title}
    >
      {children}

      {isShowFooter && (
        <div className="footer-action p-20">
          {onSubmit && (
            <MyButton onClick={onSubmit} className="mr-10" type="btn-primary">
              {textSubmit}
            </MyButton>
          )}

          {onSubmitAndClose && (
            <MyButton
              onClick={onSubmitAndClose}
              className="mr-10"
              type="btn-primary"
            >
              {textSubmitAndCancel}
            </MyButton>
          )}

          {onClose && <MyButton onClick={onClose}>{textCancel}</MyButton>}
        </div>
      )}
    </Card>
  );
};

MyCard.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  isResetPaddingBody: PropTypes.bool,
  isCardBorder: PropTypes.bool,

  // Config footer
  isShowFooter: PropTypes.bool,
  textSubmit: PropTypes.string,
  textCancel: PropTypes.string,
  textSubmitAndCancel: PropTypes.string,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  onSubmitAndClose: PropTypes.func,
  isFixMarginCard: PropTypes.bool,
};

MyCard.defaultProps = {
  title: '',
  isResetPaddingBody: true,
  isCardBorder: false,
  isFixMarginCard: false,
  isShowFooter: false,
  textSubmit: 'Save',
  textCancel: 'Cancel',
  textSubmitAndCancel: 'Save & Close',
};

export default MyCard;
