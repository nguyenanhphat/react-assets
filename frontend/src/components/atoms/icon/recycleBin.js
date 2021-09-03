import React from 'react';

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <defs>
        <path
          id="path-100"
          d="M1.6 15.236V4.14h10.8v11.096c0 .52-.176.961-.527 1.322-.352.361-.767.542-1.245.542H3.414c-.506 0-.935-.18-1.287-.542a1.824 1.824 0 01-.527-1.322zM13.3 1.697V3.33H.7V1.697h3.16L4.746.9h4.51l.884.797H13.3z"
        ></path>
      </defs>
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(-964 -1006)">
          <g transform="translate(410 71)">
            <g transform="translate(20 482)">
              <g transform="translate(1 439)">
                <g transform="translate(527 8)">
                  <g transform="translate(8 6)">
                    <mask id="mask-111" fill="#fff">
                      <use xlinkHref="#path-100"></use>
                    </mask>
                    <g fill="#CECECE" mask="url(#mask-111)">
                      <path d="M0 0H18V18H0z" transform="translate(-2)"></path>
                    </g>
                  </g>
                </g>
              </g>
              <g stroke="#CECECE">
                <path d="M0.5 0.5H578.5V501.5H0.5z"></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Icon;
