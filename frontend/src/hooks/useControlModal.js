import { useCallback, useState } from 'react';

export const useControlModalWithForm = (setSelectedItemFn, form) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [isCloseModalAfterSaved, setIsCloseModalAfterSaved] = useState(false);

  const onSave = useCallback(() => {
    setIsCloseModalAfterSaved(false);
    form.submit();
  }, [form]);

  const onSaveAndClose = useCallback(() => {
    setIsCloseModalAfterSaved(true);
    form.submit();
  }, [form]);

  const onClose = useCallback(() => {
    setVisibleModal(false);
    setSelectedItemFn(null);
  }, [setSelectedItemFn]);

  const onAfterSubmittedForm = useCallback(
    data => {
      if (isCloseModalAfterSaved) {
        setVisibleModal(false);
        setSelectedItemFn(null);
      } else {
        setSelectedItemFn(data);
      }
    },
    [isCloseModalAfterSaved, setSelectedItemFn]
  );

  return {
    form,
    visibleModal,
    setVisibleModal,
    onSave,
    onSaveAndClose,
    onAfterSubmittedForm,
    onClose,
  };
};
