import Icon, { CloseCircleOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { showModalConfirm } from 'utils/modal';
import { MyInput, MyProgress, MyTab } from '..';
import axios from '../../../utils/axios';
import File from '../icon/file';
import RecycleBin from '../icon/recycleBin';
import cn from 'classnames';
import { notifyError } from '../../../utils/notification';
import './styles.scss';

const { Dragger } = Upload;
const TABS = [
  { name: 'Upload', key: 'upload' },
  { name: 'Weblink', key: 'link' },
];
const MAX_FILE_SIZE = 52428800; // 50MB = 50*1024*1024 = 52428800

const MyUpload = ({
  onFileUploaded,
  files,
  filesUploaded,
  onRemoveFile,
  onRemoveUploadedFile,
  isColumnDisplay,
}) => {
  const [tabActive, setTabActive] = useState('upload');
  // manage for not yet uploaded
  const [listFileUploading, setListFileUploading] = useState({});
  const [listLink, setListLink] = useState([]);

  useEffect(() => {
    if (files?.length) {
      const fileUploading = {};
      for (const file of files) {
        fileUploading[file.id] = {
          name: file.name,
          percent: 100,
          link: file.link,
        };
      }
      setListFileUploading(fileUploading);
    } else {
      setListFileUploading({});
    }
  }, [files]);

  const confirmRemoveFileUploading = useCallback(
    (uidFile, file) => {
      showModalConfirm({
        title: 'Confirm',
        content: `Are you sure you want to delete ${file.name}?`,
        onOk: () => {
          setListFileUploading(prevState => {
            delete prevState[uidFile];
            return { ...prevState };
          });
          onRemoveFile && onRemoveFile(uidFile);
        },
      });
    },
    [onRemoveFile]
  );

  const confirmRemoveFileUploaded = useCallback(
    (uidFile, file) => {
      showModalConfirm({
        title: 'Confirm',
        content: `Are you sure you want to delete ${file.name}?`,
        onOk: () => {
          onRemoveUploadedFile && onRemoveUploadedFile(uidFile);
        },
      });
    },
    [onRemoveUploadedFile]
  );

  const addNewLink = useCallback(() => {
    setListLink(prevState => {
      return [...prevState, { name: '', link: '' }];
    });
  }, []);

  const removeLink = useCallback(index => {
    setListLink(prevState => {
      return prevState.filter((item, i) => i !== index && item);
    });
  }, []);

  const onClickOpenImage = useCallback(file => {
    if (file?.link) {
      const win = window.open(file.link, '_blank');
      win.focus();
    } else {
      notifyError('File', 'The file is uploading.');
    }
  }, []);

  const renderListFileUploading = useMemo(() => {
    return Object.entries(listFileUploading).map(([uid, file]) => {
      return (
        <div
          key={uid}
          className="file-item"
          onClick={() => onClickOpenImage(file)}
        >
          <div className="icon-wrapper">
            <Icon component={File} />
          </div>
          <div className="content">
            <div className="file-name">{file.name}</div>
            <MyProgress percent={file.percent} />
          </div>
          {file.percent === 100 && (
            <div className="remove-icon">
              <Icon
                type="button"
                onClick={() => confirmRemoveFileUploading(uid, file)}
                component={RecycleBin}
              />
            </div>
          )}
        </div>
      );
    });
  }, [confirmRemoveFileUploading, listFileUploading, onClickOpenImage]);

  const renderListFileUploaded = useMemo(() => {
    return filesUploaded?.length ? (
      filesUploaded.map(file => {
        return (
          <div
            onClick={() => onClickOpenImage(file)}
            key={file.id}
            className="file-item"
          >
            <div className="icon-wrapper">
              <Icon component={File} />
            </div>
            <div className="content">
              <div className="file-name">{file.name}</div>
              <MyProgress percent={100} />
            </div>
            <div className="remove-icon">
              <Icon
                type="button"
                onClick={() => confirmRemoveFileUploaded(file.id, file)}
                component={RecycleBin}
              />
            </div>
          </div>
        );
      })
    ) : (
      <p>No data to display</p>
    );
  }, [confirmRemoveFileUploaded, filesUploaded, onClickOpenImage]);

  // Upload for link
  const renderListLink = useMemo(() => {
    return listLink.map((link, index) => (
      <div className="link-item mb-20" key={link.name + index}>
        <div className="title">
          <span>Weblink</span>
          <CloseCircleOutlined
            className="icon-delete"
            onClick={() => removeLink(index)}
          />
        </div>
        <div className="web-name">
          <MyInput value={link.name} placeholder="Web Name" />
        </div>

        <div className="web-link mt-10">
          <MyInput value={link.url} placeholder="http://..." />
        </div>
      </div>
    ));
  }, [listLink, removeLink]);

  const customRequest = useCallback(
    ({ file, onSuccess }) => {
      const { size, uid, name } = file;
      if (size > MAX_FILE_SIZE) {
        notifyError('Invalid', 'The file size is too large (over 5Mb)');
        return;
      }
      setListFileUploading(prevState => ({ ...prevState, [uid]: { name } }));

      const data = new FormData();
      data.append('file', file);
      axios.post('uploadFiles', data).then(result => {
        onFileUploaded && onFileUploaded(result?.data?.data?.attachments || []);
        setListFileUploading(prevState => ({
          ...prevState,
          [uid]: { ...prevState[uid], percent: 100 },
        }));
        onSuccess('ok');
      });
    },
    [onFileUploaded]
  );

  return (
    <div className="upload-wrapper">
      <MyTab tabs={TABS} tabActive={tabActive} onChange={setTabActive}>
        {tabActive === 'upload' && (
          <div className="upload-custom">
            <div
              className={cn('contain-upload', {
                'column-display': !!isColumnDisplay,
              })}
            >
              <div className="view-upload">
                <h4>Upload</h4>
                <div className="dragger-wrapper">
                  <Dragger
                    multiple
                    showUploadList={false}
                    name="file"
                    customRequest={customRequest}
                  >
                    <div>
                      <img
                        src={require('assets/images/upload-icon.svg')}
                        alt="upload-icon"
                      />
                    </div>
                    <div className="text-drag-drop">Drag & Drop</div>
                    <div className="text-chose-file">
                      your files here, or <span>Browse</span>
                    </div>
                  </Dragger>
                </div>
                <div className="list-file-uploading">
                  {renderListFileUploading}
                </div>
              </div>
              <div
                className={cn('review-file-upload', {
                  'no-data': !filesUploaded || filesUploaded?.length === 0,
                })}
              >
                {renderListFileUploaded}
              </div>
            </div>
          </div>
        )}
        {tabActive === 'link' && (
          <div className="upload-link-custom">
            <div className="list-link">{renderListLink}</div>

            <span onClick={addNewLink} className="add-new-link">
              Add Web Link
            </span>
          </div>
        )}
      </MyTab>
    </div>
  );
};

export default MyUpload;
