import React from "react";

function Icon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='16'
      height='16'
    >
      <rect
        width='100%'
        height='100%'
        x='0'
        y='0'
        fill='none'
        stroke='none'
      ></rect>
      <defs>
        <path
          id='path-computer'
          d='M14.5 1.5h-8v-1A.5.5 0 006 0H.5a.5.5 0 00-.5.5v13a.5.5 0 00.5.5H6a.5.5 0 00.5-.5V13H13a.5.5 0 100-1h-1.59l-.3-1.5h3.39c.827 0 1.5-.673 1.5-1.5V3c0-.827-.673-1.5-1.5-1.5zm-12 9.25a.751.751 0 011.5 0 .751.751 0 01-1.5 0zM4 8H2.5a.5.5 0 110-1H4a.5.5 0 110 1zM1 6V5h4.5v1H1zm4.5-3.5v1H1v-1h4.5zm1 8h1.39l-.3 1.5H6.5v-1.5zm0-2v-6h8a.5.5 0 01.5.5v5.5H6.5z'
        ></path>
      </defs>
      <g className='currentLayer'>
        <g
          fill='none'
          fillRule='evenodd'
          stroke='none'
          strokeWidth='1'
          className='selected'
          opacity='1'
        >
          <g fill='none' stroke='none' opacity='1'>
            <g opacity='1'>
              <path
                fill='none'
                stroke='none'
                d='M-850 -222H590V1147H-850z'
                opacity='1'
              ></path>
            </g>
            <g opacity='1'>
              <g opacity='1'>
                <path
                  fill='none'
                  stroke='none'
                  d='M-610 -91H570V1114H-610z'
                  opacity='1'
                ></path>
              </g>
              <g opacity='1'>
                <g fill='none' stroke='none' opacity='1'>
                  <g opacity='1'>
                    <rect
                      width='268'
                      height='39'
                      x='-11.5'
                      y='-11.5'
                      fill='none'
                      stroke='none'
                      opacity='1'
                      rx='4'
                    ></rect>
                  </g>
                  <g opacity='1'>
                    <path
                      d='M27.5-11.5v39H-8a3.489 3.489 0 01-2.475-1.025A3.489 3.489 0 01-11.5 24V-8c0-.966.392-1.841 1.025-2.475A3.489 3.489 0 01-8-11.5h35.5z'
                      opacity='1'
                    ></path>
                    <g opacity='1'>
                      <g fill='none' stroke='none' opacity='1'>
                        <mask
                          id='mask-2'
                          fill='#fff'
                          transform='translate(0 .8)'
                        >
                          <use xlinkHref='#path-computer'></use>
                        </mask>
                        <use
                          x='0'
                          y='0.8'
                          fill='currentColor'
                          fillRule='nonzero'
                          xlinkHref='#path-computer'
                        ></use>
                        <g
                          fill='none'
                          stroke='none'
                          mask='url(#mask-2)'
                          opacity='1'
                        >
                          <path
                            fill='none'
                            stroke='none'
                            d='M0 0.8H16V17.2H0z'
                            opacity='1'
                          ></path>
                        </g>
                      </g>
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

export default React.memo(Icon);
