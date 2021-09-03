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
          id="path-config"
          d="M9.25 0c.259 0 .469.21.469.469v1.035c.58.153 1.135.384 1.658.689l.733-.734a.469.469 0 01.663 0l1.768 1.768a.469.469 0 010 .663l-.734.733c.305.523.536 1.078.69 1.658h1.034c.26 0 .469.21.469.469v2.5c0 .259-.21.469-.469.469h-1.035a6.643 6.643 0 01-.689 1.658l.734.733a.469.469 0 010 .663l-1.768 1.768a.469.469 0 01-.663 0l-.734-.734a6.642 6.642 0 01-1.657.69v1.034c0 .26-.21.469-.47.469h-2.5a.469.469 0 01-.468-.469v-1.035a6.643 6.643 0 01-1.658-.689l-.733.734a.469.469 0 01-.663 0l-1.768-1.768a.469.469 0 010-.663l.734-.733a6.642 6.642 0 01-.69-1.658H.47A.469.469 0 010 9.25v-2.5c0-.259.21-.469.469-.469h1.035c.153-.58.384-1.135.689-1.658l-.734-.733a.469.469 0 010-.663l1.768-1.768a.469.469 0 01.663 0l.733.734a6.642 6.642 0 011.658-.69V.47c0-.26.21-.469.469-.469zM8 3.625A4.38 4.38 0 003.625 8 4.38 4.38 0 008 12.375 4.38 4.38 0 0012.375 8 4.38 4.38 0 008 3.625zm-.469 2.031v.938a.469.469 0 00.938 0v-.938h1.406c.259 0 .469.21.469.469v3.75c0 .259-.21.469-.469.469h-3.75a.469.469 0 01-.469-.469v-3.75c0-.259.21-.469.469-.469h1.406z"
        ></path>
      </defs>
      <g className="currentLayer">
        <g
          fill="none"
          fillRule="evenodd"
          stroke="none"
          strokeWidth="1"
          className="selected"
          opacity="1"
        >
          <g fill="none" stroke="none" opacity="1">
            <g fill="none" stroke="none" opacity="1">
              <g fill="none" stroke="none" opacity="1">
                <g fill="none" stroke="none" opacity="1">
                  <g fill="none" stroke="none" opacity="1">
                    <mask id="mask-2" fill="#fff">
                      <use xlinkHref="#path-config"></use>
                    </mask>
                    <use
                      x="0"
                      y="0"
                      fill="currentColor"
                      fillRule="nonzero"
                      xlinkHref="#path-config"
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
