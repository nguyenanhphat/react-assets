import { useEffect } from 'react';

const useOutsideClick = (ref, open, callback) => {
  useEffect(() => {
    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback(e);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [open, callback, ref]);
};

export default useOutsideClick;
