import { useCallback, useEffect, useMemo, useState } from 'react';

export const useControlUpload = uploadedAttachmentsProp => {
  const [attachments, setAttachments] = useState([]);
  const [uploadedAttachments, setUploadedAttachments] = useState([]);

  useEffect(() => {
    setAttachments([]);
    if (uploadedAttachmentsProp?.length) {
      setUploadedAttachments(uploadedAttachmentsProp);
    }
  }, [uploadedAttachmentsProp]);

  const onFileUploaded = useCallback(attachmentsVal => {
    console.log('attachmentsVal ', attachmentsVal);
    setAttachments(preState => [...preState, ...attachmentsVal]);
  }, []);
  const onRemoveFile = useCallback(idFile => {
    setAttachments(preState => preState.filter(item => item.id !== idFile));
  }, []);

  const onRemoveUploadedFile = useCallback(idFile => {
    setUploadedAttachments(preState =>
      preState.filter(item => item.id !== idFile)
    );
  }, []);

  const files = useMemo(
    () =>
      attachments?.length
        ? attachments.map(item => ({
            id: item.id,
            name: item.name,
            link: item.attachmentLink,
          }))
        : [],
    [attachments]
  );
  const filesUploaded = useMemo(
    () =>
      uploadedAttachments?.length
        ? uploadedAttachments.map(item => ({
            id: item.id,
            name: item.name,
            link: item.attachmentLink,
          }))
        : [],
    [uploadedAttachments]
  );
  return {
    files,
    attachments,
    setAttachments,
    filesUploaded,
    onFileUploaded,
    onRemoveFile,
    onRemoveUploadedFile,
  };
};
