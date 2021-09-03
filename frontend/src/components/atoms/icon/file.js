import React from 'react';

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="16"
      height="16"
      viewBox="0 0 20 20"
    >
      <defs>
        <path
          id="path-file"
          d="M19.886 5.412L14.479.118A.42.42 0 0014.185 0h-8.06C5.224 0 4.49.691 4.49 1.54v5.383H1.224C.549 6.923 0 7.44 0 8.076v5.771C0 14.483.549 15 1.224 15H4.49v3.462c0 .848.734 1.538 1.635 1.538h12.24c.901 0 1.635-.69 1.635-1.537V5.679c0-.1-.04-.195-.114-.267zm-5.6-4.374l4.439 4.347h-4.44V1.038zm4.898 17.425c0 .423-.368.768-.82.768H6.125c-.451 0-.819-.345-.819-.769V15h6.94c.674 0 1.223-.517 1.223-1.153V8.076c0-.636-.549-1.153-1.223-1.153h-6.94V1.541c0-.426.368-.772.82-.772h7.343v5c0 .213.183.385.409.385h5.306v12.309z"
        ></path>
      </defs>
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(-922 -1605)">
          <g transform="translate(232 1271)">
            <g transform="translate(690 334)">
              <mask id="mask-file" fill="#fff">
                <use xlinkHref="#path-file"></use>
              </mask>
              <g fill="currentColor" mask="url(#mask-file)">
                <g>
                  <path d="M0 0H20V20H0z"></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Icon;
