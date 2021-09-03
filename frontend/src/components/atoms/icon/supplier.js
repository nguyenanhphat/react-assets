import React from 'react';

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="16"
      height="16"
    >
      <rect
        width="100%"
        height="100%"
        x="0"
        y="0"
        fill="none"
        stroke="none"
      ></rect>
      <defs>
        <path
          id="path-supplier"
          d="M7.713.087a.526.526 0 01.574 0l7.5 5.166a.503.503 0 01.213.414v9.666c0 .367-.3.667-.667.667h-2.666V8.5c0-.275-.225-.5-.5-.5H3.833c-.274 0-.5.225-.5.5V16H.667A.669.669 0 010 15.333V5.667c0-.167.08-.32.213-.414zm3.954 14.246V16H4.333v-1.667h7.334zm0-2.666v1.666H4.333v-1.666h7.334zm0-2.667v1.667H4.333V9h7.334z"
        ></path>
      </defs>
      <g className="currentLayer">
        <g
          fill="none"
          fillRule="evenodd"
          stroke="none"
          strokeWidth="1"
          opacity="1"
        >
          <g fill="none" stroke="none" opacity="1">
            <g fill="none" stroke="none" opacity="1">
              <g fill="none" stroke="none" opacity="1">
                <g fill="none" stroke="none" opacity="1">
                  <g fill="none" stroke="none" opacity="1">
                    <mask id="mask-2" fill="#fff">
                      <use xlinkHref="#path-supplier"></use>
                    </mask>
                    <use
                      x="0"
                      y="0"
                      fill="currentColor"
                      fillRule="nonzero"
                      xlinkHref="#path-supplier"
                    ></use>
                    <g
                      fill="none"
                      stroke="none"
                      mask="url(#mask-2)"
                      opacity="1"
                    >
                      <path
                        fill="none"
                        stroke="none"
                        d="M0 0H16V16H0z"
                        opacity="1"
                      ></path>
                    </g>
                  </g>
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
