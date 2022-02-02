import React from 'react';
import cn from 'classnames';

import s from './s.module.scss';

export type IconWalletProps = React.SVGProps<any> & {
  wallet: string;
};

export const IconWallet: React.FC<IconWalletProps> = ({ wallet, className, ...rest }) => {
  switch (wallet) {
    case 'ledger':
      return (
        <svg
          viewBox="0 0 1916.3 516.8"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(s.ledger, className)}
          {...rest}
        >
          <path
            d="M578.2 392.7V24.3h25.6v344.1h175.3v24.3H578.2zm327.5 5.1c-39.7 0-70.4-12.8-93.4-37.1-21.7-24.3-33.3-58.8-33.3-103.6 0-43.5 10.2-79.3 32-104.9 21.7-26.9 49.9-39.7 87-39.7 32 0 57.6 11.5 76.8 33.3 19.2 23 28.1 53.7 28.1 92.1v20.5H804.6c0 37.1 9 66.5 26.9 85.7 16.6 20.5 42.2 29.4 74.2 29.4 15.3 0 29.4-1.3 40.9-3.8 11.5-2.6 26.9-6.4 44.8-14.1v24.3c-15.3 6.4-29.4 11.5-42.2 14.1-14.3 2.6-28.9 3.9-43.5 3.8zM898 135.6c-26.9 0-47.3 9-64 25.6-15.3 17.9-25.6 42.2-28.1 75.5h168.9c0-32-6.4-56.3-20.5-74.2-12.8-18-32-26.9-56.3-26.9zm238-21.8c19.2 0 37.1 3.8 51.2 10.2 14.1 7.7 26.9 19.2 38.4 37.1h1.3c-1.3-21.7-1.3-42.2-1.3-62.7V0h24.3v392.7h-16.6l-6.4-42.2c-20.5 30.7-51.2 47.3-89.6 47.3s-66.5-11.5-87-35.8c-20.5-23-29.4-57.6-29.4-102.3 0-47.3 10.2-83.2 29.4-108.7 19.2-25.6 48.6-37.2 85.7-37.2zm0 21.8c-29.4 0-52.4 10.2-67.8 32-15.3 20.5-23 51.2-23 92.1 0 78 30.7 116.4 90.8 116.4 30.7 0 53.7-9 67.8-26.9 14.1-17.9 21.7-47.3 21.7-89.6v-3.8c0-42.2-7.7-72.9-21.7-90.8-12.8-20.5-35.8-29.4-67.8-29.4zm379.9-16.6v17.9l-56.3 3.8c15.3 19.2 23 39.7 23 61.4 0 26.9-9 47.3-26.9 64-17.9 16.6-40.9 24.3-70.4 24.3-12.8 0-21.7 0-25.6-1.3-10.2 5.1-17.9 11.5-23 17.9-5.1 7.7-7.7 14.1-7.7 23s3.8 15.3 10.2 19.2c6.4 3.8 17.9 6.4 33.3 6.4h47.3c29.4 0 52.4 6.4 67.8 17.9s24.3 29.4 24.3 53.7c0 29.4-11.5 51.2-34.5 66.5-23 15.3-56.3 23-99.8 23-34.5 0-61.4-6.4-80.6-20.5-19.2-12.8-28.1-32-28.1-55 0-19.2 6.4-34.5 17.9-47.3s28.1-20.5 47.3-25.6c-7.7-3.8-15.3-9-19.2-15.3-5-6.2-7.7-13.8-7.7-21.7 0-17.9 11.5-34.5 34.5-48.6-15.3-6.4-28.1-16.6-37.1-30.7-9-14.1-12.8-30.7-12.8-48.6 0-26.9 9-49.9 25.6-66.5 17.9-16.6 40.9-24.3 70.4-24.3 17.9 0 32 1.3 42.2 5.1h85.7v1.3h.2zm-222.6 319.8c0 37.1 28.1 56.3 84.4 56.3 71.6 0 107.5-23 107.5-69.1 0-16.6-5.1-28.1-16.6-35.8-11.5-7.7-29.4-11.5-55-11.5h-44.8c-49.9 1.2-75.5 20.4-75.5 60.1zm21.8-235.4c0 21.7 6.4 37.1 19.2 49.9 12.8 11.5 29.4 17.9 51.2 17.9 23 0 40.9-6.4 52.4-17.9 12.8-11.5 17.9-28.1 17.9-49.9 0-23-6.4-40.9-19.2-52.4-12.8-11.5-29.4-17.9-52.4-17.9-21.7 0-39.7 6.4-51.2 19.2-12.8 11.4-17.9 29.3-17.9 51.1z"
            fill="currentColor"
          />
          <path
            d="M1640 397.8c-39.7 0-70.4-12.8-93.4-37.1-21.7-24.3-33.3-58.8-33.3-103.6 0-43.5 10.2-79.3 32-104.9 21.7-26.9 49.9-39.7 87-39.7 32 0 57.6 11.5 76.8 33.3 19.2 23 28.1 53.7 28.1 92.1v20.5h-197c0 37.1 9 66.5 26.9 85.7 16.6 20.5 42.2 29.4 74.2 29.4 15.3 0 29.4-1.3 40.9-3.8 11.5-2.6 26.9-6.4 44.8-14.1v24.3c-15.3 6.4-29.4 11.5-42.2 14.1-14.1 2.6-28.2 3.8-44.8 3.8zm-6.4-262.2c-26.9 0-47.3 9-64 25.6-15.3 17.9-25.6 42.2-28.1 75.5h168.9c0-32-6.4-56.3-20.5-74.2-12.8-18-32-26.9-56.3-26.9zm245.6-21.8c11.5 0 24.3 1.3 37.1 3.8l-5.1 24.3c-11.8-2.6-23.8-3.9-35.8-3.8-23 0-42.2 10.2-57.6 29.4-15.3 20.5-23 44.8-23 75.5v149.7h-25.6V119h21.7l2.6 49.9h1.3c11.5-20.5 23-34.5 35.8-42.2 15.4-9 30.7-12.9 48.6-12.9zM333.9 12.8h-183v245.6h245.6V76.7c.1-34.5-28.1-63.9-62.6-63.9zm-239.2 0H64c-34.5 0-64 28.1-64 64v30.7h94.7V12.8zM0 165h94.7v94.7H0V165zm301.9 245.6h30.7c34.5 0 64-28.1 64-64V316h-94.7v94.6zm-151-94.6h94.7v94.7h-94.7V316zM0 316v30.7c0 34.5 28.1 64 64 64h30.7V316H0z"
            fill="currentColor"
          />
        </svg>
      );
    case 'metamask':
      return (
        <svg viewBox="0 0 1307.3 240" className={cn(s.metamask, className)} {...rest}>
          <defs />
          <g fill="currentColor">
            <path d="M1154.5 120.7c-6.8-4.5-14.3-7.7-21.4-11.7-4.6-2.6-9.5-4.9-13.5-8.2-6.8-5.6-5.4-16.6 1.7-21.4 10.2-6.8 27.1-3 28.9 10.9 0 .3.3.5.6.5h15.4c.4 0 .7-.3.6-.7-.8-9.6-4.5-17.6-11.3-22.7-6.5-4.9-13.9-7.5-21.8-7.5-40.7 0-44.4 43.1-22.5 56.7 2.5 1.6 24 12.4 31.6 17.1s10 13.3 6.7 20.1c-3 6.2-10.8 10.5-18.6 10-8.5-.5-15.1-5.1-17.4-12.3-.4-1.3-.6-3.8-.6-4.9 0-.3-.3-.6-.6-.6h-16.7c-.3 0-.6.3-.6.6 0 12.1 3 18.8 11.2 24.9 7.7 5.8 16.1 8.2 24.8 8.2 22.8 0 34.6-12.9 37-26.3 2.1-13.1-1.8-24.9-13.5-32.7zM429.4 62.1h-15.5c-.3 0-.5.2-.6.4l-13.7 45.2c-.2.6-1 .6-1.2 0l-13.7-45.2c-.1-.3-.3-.4-.6-.4h-25.5c-.3 0-.6.3-.6.6v115.4c0 .3.3.6.6.6h16.7c.3 0 .6-.3.6-.6V90.4c0-.7 1-.8 1.2-.2l13.8 45.5 1 3.2c.1.3.3.4.6.4h12.8c.3 0 .5-.2.6-.4l1-3.2 13.8-45.5c.2-.7 1.2-.5 1.2.2v87.7c0 .3.3.6.6.6h16.7c.3 0 .6-.3.6-.6V62.7c0-.3-.3-.6-.6-.6h-9.8zM898.8 62.1c-.3 0-.5.2-.6.4l-13.7 45.2c-.2.6-1 .6-1.2 0l-13.7-45.2c-.1-.3-.3-.4-.6-.4h-25.4c-.3 0-.6.3-.6.6v115.4c0 .3.3.6.6.6h16.7c.3 0 .6-.3.6-.6V90.4c0-.7 1-.8 1.2-.2l13.8 45.5 1 3.2c.1.3.3.4.6.4h12.8c.3 0 .5-.2.6-.4l1-3.2 13.8-45.5c.2-.7 1.2-.5 1.2.2v87.7c0 .3.3.6.6.6h16.7c.3 0 .6-.3.6-.6V62.7c0-.3-.3-.6-.6-.6h-25.4zM683.4 62.1h-78.9c-.3 0-.6.3-.6.6v14.4c0 .3.3.6.6.6H635v100.4c0 .3.3.6.6.6h16.7c.3 0 .6-.3.6-.6V77.7h30.5c.3 0 .6-.3.6-.6V62.7c0-.3-.2-.6-.6-.6zM781.9 178.7h15.2c.4 0 .7-.4.6-.8L766.3 62.1c-.1-.3-.3-.4-.6-.4h-21.8c-.3 0-.5.2-.6.4l-31.4 115.8c-.1.4.2.8.6.8h15.2c.3 0 .5-.2.6-.4l9.1-33.7c.1-.3.3-.4.6-.4h33.6c.3 0 .5.2.6.4l9.1 33.7c.1.2.4.4.6.4zm-39.9-51l12.2-45.1c.2-.6 1-.6 1.2 0l12.2 45.1c.1.4-.2.8-.6.8h-24.4c-.4 0-.7-.4-.6-.8zM1041.1 178.7h15.2c.4 0 .7-.4.6-.8l-31.4-115.8c-.1-.3-.3-.4-.6-.4h-21.8c-.3 0-.5.2-.6.4l-31.4 115.8c-.1.4.2.8.6.8h15.2c.3 0 .5-.2.6-.4l9.1-33.7c.1-.3.3-.4.6-.4h33.6c.3 0 .5.2.6.4l9.1 33.7c.1.2.3.4.6.4zm-39.9-51l12.2-45.1c.2-.6 1-.6 1.2 0l12.2 45.1c.1.4-.2.8-.6.8h-24.4c-.4 0-.7-.4-.6-.8zM507.6 161.6v-35.8c0-.3.3-.6.6-.6h44.5c.3 0 .6-.3.6-.6v-14.4c0-.3-.3-.6-.6-.6h-44.5c-.3 0-.6-.3-.6-.6V78.4c0-.3.3-.6.6-.6h50.6c.3 0 .6-.3.6-.6V62.8c0-.3-.3-.6-.6-.6h-68.5c-.3 0-.6.3-.6.6v115.3c0 .3.3.6.6.6h70.6c.3 0 .6-.3.6-.6v-15.2c0-.3-.3-.6-.6-.6h-52.8c-.3-.1-.5-.3-.5-.7zM1307.1 177.7l-57.8-59.7a.6.6 0 010-.8l52-54c.4-.4.1-1-.4-1h-21.3c-.2 0-.3.1-.4.2l-44.1 45.8c-.4.4-1 .1-1-.4v-45c0-.3-.3-.6-.6-.6h-16.7c-.3 0-.6.3-.6.6v115.4c0 .3.3.6.6.6h16.7c.3 0 .6-.3.6-.6v-50.8c0-.5.7-.8 1-.4l50 51.6c.1.1.3.2.4.2h21.3c.4-.1.7-.8.3-1.1z" />
          </g>
          <g strokeLinecap="round" strokeLinejoin="round">
            <path fill="#E17726" stroke="#E17726" d="M243.9 0L142.8 75l18.8-44.2z" />
            <g fill="#E27625" stroke="#E27625">
              <path d="M10.7 0l100.2 75.7L93 30.8zM207.5 173.9l-26.9 41.2 57.6 15.9 16.5-56.2zM0 174.8L16.4 231l57.5-15.9-26.8-41.2z" />
              <path d="M70.8 104.3l-16 24.2 57 2.6-1.9-61.5zM183.8 104.3l-39.7-35.4-1.3 62.2 57-2.6zM73.9 215.1l34.5-16.7-29.7-23.2zM146.2 198.4l34.4 16.7-4.7-39.9z" />
            </g>
            <g fill="#D5BFB2" stroke="#D5BFB2">
              <path d="M180.6 215.1l-34.4-16.7 2.8 22.4-.3 9.5zM73.9 215.1l32 15.2-.2-9.5 2.7-22.4z" />
            </g>
            <path fill="#233447" stroke="#233447" d="M106.5 160.4L77.9 152l20.2-9.3zM148.1 160.4l8.4-17.7 20.3 9.3z" />
            <g fill="#CC6228" stroke="#CC6228">
              <path d="M73.9 215.1l5-41.2-31.8.9zM175.7 173.9l4.9 41.2 26.9-40.3zM199.8 128.5l-57 2.6 5.3 29.3 8.4-17.7 20.3 9.3zM77.9 152l20.2-9.3 8.4 17.7 5.3-29.3-57-2.6z" />
            </g>
            <g fill="#E27525" stroke="#E27525">
              <path d="M54.8 128.5l23.9 46.7-.8-23.2zM176.8 152l-.9 23.2 23.9-46.7zM111.8 131.1l-5.3 29.3 6.7 34.6 1.5-45.6zM142.8 131.1l-2.8 18.2 1.4 45.7 6.7-34.6z" />
            </g>
            <path
              fill="#F5841F"
              stroke="#F5841F"
              d="M148.1 160.4l-6.7 34.6 4.8 3.4 29.7-23.2.9-23.2zM77.9 152l.8 23.2 29.7 23.2 4.8-3.4-6.7-34.6z"
            />
            <path
              fill="#C0AC9D"
              stroke="#C0AC9D"
              d="M148.7 230.3l.3-9.5-2.6-2.2h-38.2l-2.5 2.2.2 9.5-32-15.2 11.2 9.2 22.7 15.7h38.9l22.8-15.7 11.1-9.2z"
            />
            <path
              fill="#161616"
              stroke="#161616"
              d="M146.2 198.4l-4.8-3.4h-28.2l-4.8 3.4-2.7 22.4 2.5-2.2h38.2l2.6 2.2z"
            />
            <g fill="#763E1A" stroke="#763E1A">
              <path d="M248.2 79.9l8.5-41.4L243.9 0l-97.7 72.5 37.6 31.8 53.1 15.5 11.7-13.7-5.1-3.7 8.1-7.4-6.2-4.8 8.1-6.2zM-2.1 38.5l8.6 41.4L1 84l8.2 6.2L3 95l8.1 7.4-5.1 3.7 11.7 13.7 53.1-15.5 37.6-31.8L10.7 0z" />
            </g>
            <path
              fill="#F5841F"
              stroke="#F5841F"
              d="M236.9 119.8l-53.1-15.5 16 24.2-23.9 46.7 31.6-.4h47.2zM70.8 104.3l-53.1 15.5-17.7 55h47.1l31.6.4-23.9-46.7zM142.8 131.1l3.4-58.6 15.4-41.7H93l15.4 41.7 3.4 58.6 1.3 18.4.1 45.5h28.2l.1-45.5z"
            />
          </g>
        </svg>
      );
    case 'portis':
      return (
        <svg viewBox="0 0 600 185" className={cn(s.portis, className)} {...rest}>
          <defs />
          <path id="canvas_background" fill="none" d="M-1-1h602v187H-1z" />
          <path id="svg_3" fill="#133444" d="M1.9 105.43l4.4-1.91 54.2-23.59 58.6 25.5-22 45.5-53.8 7.59-40.5-43.69z" />
          <path
            id="svg_4"
            fill="#c42370"
            d="M107 77.42a60.1 60.1 0 00-38.4-21.2l-1-.1c-4.7-.6-9.4-.6-14.1 0l-1 .1c-15 2-28.7 9.6-38.4 21.2l-2.4 4-4.1 6.7-3 4.9c0 .1-.1.3-.2.4v.1l6.5 3.9 41.5 24.6 8 4.7v-58.7l-8 3.6v-8.8l8-3.6 8 3.6 40.8 18.6-2.2-4z"
          />
          <path
            id="svg_5"
            fill="#1c4d6b"
            d="M120.9 120.03c-.1 19.3-8.8 37.5-23.7 49.7a60.7 60.7 0 01-19.1 10.6 55.4 55.4 0 01-17.6 2.8c-33.4 0-60.5-29.7-60.5-63.1 0-4.9.6-9.8 1.8-14.6l58.6 34.7 58.6-34.7c1.3 4.8 2 9.7 1.9 14.6z"
          />
          <path id="svg_6" d="M53.5 56.12l7 3.1-8 3.71v-7.31z" />
          <path id="svg_7" d="M52.5 71.72l8-3.7v58.81l-8-4.81z" />
          <path id="svg_8" fill="#1d4259" d="M60.5 68.02v58.81l56.2-33.21z" />
          <path id="svg_9" d="M60.5.42v67.6l56.2 25.6z" className="st4" />
          <path
            id="svg_10"
            fill="#343535"
            d="M60.5 68.03v58.7l-8-4.7-48.1-28.4h-.1.1c0-.1.1-.3.2-.4l7-11.7 40.8-18.5v8.7l8.1-3.7z"
          />
          <path id="svg_11" fill="#3e5578" d="M60.5 68.02v58.81l-8-4.81-48.1-28.4.1-.1 48-21.8z" />
          <path id="svg_12" d="M60.5.42v67.6L4.4 93.62z" className="st7" />
          <path id="svg_13" d="M37.8 178.32c.8.4 1.7.7 2.5 1-.8-.3-1.6-.7-2.5-1z" className="st8" />
          <path id="svg_14" d="M40.3 179.32c.8.3 1.7.7 2.6.9-.8-.2-1.7-.5-2.6-.9z" className="st8" />
          <path id="svg_15" d="M45.2 180.93c.7.2 1.3.4 2 .5-.7-.1-1.4-.3-2-.5z" className="st8" />
          <path
            id="svg_16"
            d="M1.9 105.42l58.6 34.7c-.8 5.3-2.2 10.4-4.2 15.4-4.7 11.4-14.1 23.4-32.5 14.2a64.64 64.64 0 01-23.7-49.7c0-4.9.6-9.8 1.8-14.6z"
            className="st7"
          />
          <path
            id="svg_17"
            fill="#529bba"
            d="M97.2 169.72l-.2.1c-.3.2-.6.5-.9.7l-.1.1c-.3.3-.7.5-1 .8-.4.3-.7.6-1.1.8-.4.2-.8.5-1.1.8-.4.3-.7.4-1 .7l-.2.1c-.4.2-.7.4-1 .7 0 0-.1 0-.1.1-.4.2-.7.4-1.1.7-.4.2-.8.4-1.2.7l-1.2.6-1.2.6-1.2.6-1.2.6c-.8.4-1.7.7-2.5 1-.8.3-1.7.6-2.6.9l-1 .3-1.2.4c-.7.2-1.3.4-2 .5-.2.1-.5.1-.8.2l-.4.1-1.1.2c-.4.1-.6.1-1 .2-.3.1-.6.1-.9.2-.3 0-.7.1-1 .2-.2 0-.3 0-.5.1l-.8.1h-.4c-.3 0-.6.1-.8.1-.3 0-.7.1-1 .1H56.2c-.3 0-.7-.1-1-.1-.3 0-.6 0-.8-.1H54c-.2 0-.5-.1-.8-.1-.2 0-.3 0-.5-.1-.3 0-.7-.1-1-.2-.3 0-.6-.1-.9-.2-.3 0-.7-.1-1-.2-.3-.1-.7-.2-1.1-.2l-.4-.1c-.3 0-.6-.1-.8-.1-.7-.2-1.4-.4-2-.5l-1.2-.4c-.4-.1-.7-.2-1-.3-.9-.3-1.7-.6-2.6-.9-.9-.3-1.7-.7-2.5-1l-1.2-.6-1.2-.6-1.2-.6-1.2-.6c-.4-.2-.8-.4-1.2-.7-.4-.2-.7-.4-1.1-.7l-.1-.1c-.4-.2-.7-.4-1-.7l-.2-.1c-.3-.2-.7-.4-1-.7-.3-.2-.8-.5-1.1-.8-.4-.3-.8-.5-1.1-.8l-1-.8-.1-.1c-.3-.2-.6-.5-.9-.7l-.2-.1c18.3 9.1 27.8-2.9 32.5-14.2 2-4.9 3.4-10.1 4.2-15.4.8 5.3 2.2 10.4 4.2 15.4 4.1 11.2 13.6 23.2 31.9 14.1z"
          />
          <path id="svg_18" d="M73.9 181.53z" className="st8" />
          <path id="svg_19" d="M78.1 180.22c.9-.3 1.7-.6 2.6-.9-.8.4-1.7.7-2.6.9z" className="st8" />
          <path id="svg_20" d="M80.7 179.32c.8-.3 1.7-.7 2.5-1-.8.3-1.6.7-2.5 1z" className="st8" />
          <path
            id="svg_21"
            d="M120.9 120.03c-.1 19.3-8.8 37.5-23.7 49.7-18.3 9.1-27.8-2.9-32.5-14.2-2-4.9-3.4-10.1-4.2-15.4l58.6-34.7c1.2 4.8 1.8 9.7 1.8 14.6z"
            className="st4"
          />
          <path
            d="M185.6 181.32h-19.9V48.63h19.9v9.4c7.9-7.9 16.7-11.7 26.6-11.7 11.8 0 21.6 4.3 29.2 13.1 7.8 8.7 11.6 19.5 11.6 32.7 0 12.9-3.9 23.6-11.6 32.1-7.3 8.3-17.8 13-28.9 12.8-10 0-19.1-4.1-27-12.1v56.4h.1zm47.2-89.3c0-8.2-2.3-14.9-6.7-20.1-4.2-5.1-10.5-8-17.1-7.9-7.3 0-13.2 2.5-17.7 7.6s-6.8 11.7-6.8 20c0 8 2.3 14.7 6.8 20 4.5 5.2 10.4 7.7 17.6 7.7 6.5.1 12.8-2.7 17-7.8 4.6-5.2 6.9-11.7 6.9-19.5z"
            fill="currentColor"
          />
          <path
            d="M270 91.03c-.2-12 4.6-23.4 13.3-31.7 8.6-8.6 20.3-13.3 32.4-13.1 12.8 0 23.7 4.4 32.6 13.2 8.9 8.8 13.2 19.5 13.2 32.2 0 12.9-4.4 23.7-13.3 32.3-8.9 8.7-19.9 13-32.9 13s-23.7-4.4-32.3-13.2-13-19.6-13-32.7zm20.4.3c0 8.6 2.3 15.4 6.9 20.4 4.6 5.1 10.9 7.6 18.6 7.6s14-2.5 18.6-7.5c4.6-5 7-11.6 7-20s-2.3-15-7-20c-4.6-5.1-10.9-7.6-18.6-7.6s-13.7 2.5-18.4 7.6c-4.8 5-7.1 11.5-7.1 19.5z"
            fill="currentColor"
          />
          <path
            d="M382.7 48.63h19.9v7.7c3.6-3.8 6.9-6.4 9.7-7.9 3.2-1.5 6.7-2.2 10.2-2.2 5.2 0 10.7 1.7 16.4 5.1l-9.1 18.2c-3.8-2.7-7.4-4.1-11-4.1-10.8 0-16.3 8.1-16.3 24.5v44.5h-19.9l.1-85.8z"
            fill="currentColor"
          />
          <path d="M470.7 67.13v67.4h-19.9v-67.4h-8.5v-18.5h8.5v-31.5h19.9v31.5h15.4v18.5h-15.4z" fill="currentColor" />
          <path
            d="M496.6 12.82c0-3.4 1.3-6.7 3.8-9 5.1-5.1 13.3-5.1 18.3 0 2.5 2.4 3.9 5.7 3.8 9.1.1 3.5-1.3 6.8-3.8 9.2-2.4 2.5-5.7 3.9-9.1 3.8-3.5.1-6.8-1.3-9.2-3.8-2.5-2.4-3.9-5.8-3.8-9.3zm22.9 35.8v85.9h-19.9v-85.9h19.9z"
            fill="currentColor"
          />
          <path
            d="M594.5 63.23l-16.5 8.8c-2.6-5.3-5.8-7.9-9.6-7.9-1.7 0-3.4.6-4.7 1.8-1.3 1.2-2 2.9-1.9 4.6 0 3.3 3.8 6.6 11.5 9.8 10.6 4.5 17.6 8.7 21.2 12.6 3.6 3.9 5.5 8.9 5.5 15.4.2 7.9-3.2 15.6-9.2 20.8-5.9 5.3-13.6 8.1-21.5 7.9-14.4 0-24.6-7-30.6-21l17-7.9c2.3 4.2 4.2 6.8 5.4 7.9 2.3 2.2 5.5 3.4 8.7 3.3 6.7 0 10-3.1 10-9.2 0-3.5-2.6-6.9-7.8-9.8-2-1-4-2-6-2.9-2-.9-4.1-1.9-6.1-2.9-5.8-2.8-9.8-5.6-12.2-8.5-3-3.6-4.5-8.2-4.5-13.8 0-7.5 2.5-13.6 7.7-18.5 5.1-4.8 12-7.5 19.1-7.3 11-.2 19.1 5.5 24.5 16.8z"
            fill="currentColor"
          />
        </svg>
      );
    case 'trezor':
      return (
        <svg viewBox="0 0 2567.5 722.3" className={cn(s.trezor, className)} {...rest}>
          <path
            fill="currentColor"
            d="M249 0C149.9 0 69.7 80.2 69.7 179.3v67.2C34.9 252.8 0 261.2 0 272.1v350.7s0 9.7 10.9 14.3c39.5 16 194.9 71 230.6 83.6 4.6 1.7 5.9 1.7 7.1 1.7 1.7 0 2.5 0 7.1-1.7 35.7-12.6 191.5-67.6 231-83.6a16.7 16.7 0 0010.5-13.9V272.1c0-10.9-34.4-19.7-69.3-25.6v-67.2C428.4 80.2 347.7 0 249 0zm0 85.7c58.4 0 93.7 35.3 93.7 93.7v58.4c-65.5-4.6-121.4-4.6-187.3 0v-58.4c0-58.5 35.3-93.7 93.6-93.7zm-.4 238.1c81.5 0 149.9 6.3 149.9 17.6v218.8c0 3.4-.4 3.8-3.4 5-2.9 1.3-139 50.4-139 50.4s-5.5 1.7-7.1 1.7c-1.7 0-7.1-2.1-7.1-2.1s-136.1-49.1-139-50.4-3.4-1.7-3.4-5V341c-.8-11.3 67.6-17.2 149.1-17.2zM728.47 563.18v-239.6h-87.55v-85.92h272.96v85.92H827.2v239.6h-98.72zM1135.04 563.18l-44.92-102.36h-35.74v102.36h-98.73V237.66h173.75c76.27 0 117.18 50.55 117.18 111.53 0 56.2-32.5 85.92-58.59 98.73l58.97 115.17h-111.92zm11.66-213.99c0-17.68-15.67-25.33-32.11-25.33h-60.21v51.42h60.2c16.45-.38 32.12-8.03 32.12-26.09zM1298.38 563.18V237.66h246.87v85.92h-148.52v32.11h144.89v85.92h-144.9v35.75h148.53v85.82h-246.87zM1596.57 563.57v-78.28l124.06-161.33h-124.06v-85.92h254.04v77.5l-124.44 162.2h128.07v85.92l-257.67-.1zM1878.33 401c0-99.98 77.51-168.6 178.25-168.6 100.35 0 178.24 68.24 178.24 168.6 0 99.96-77.5 168.2-178.24 168.2s-178.25-68.24-178.25-168.2zm256.14 0c0-45.4-30.87-81.53-78.28-81.53-47.4 0-78.27 36.12-78.27 81.52s30.87 81.53 78.27 81.53c47.8 0 78.28-36.13 78.28-81.53zM2455.5 563.57L2410.6 461.2h-35.75v102.37h-98.73V238.04h173.76c76.27 0 117.17 50.56 117.17 111.53 0 56.2-32.5 85.93-58.59 98.73l58.97 115.17h-111.91zm12.05-214.38c0-17.68-15.68-25.33-32.11-25.33h-60.22v51.42h60.22c16.53-.38 32.1-8.03 32.1-26.09z"
          />
        </svg>
      );
    case 'coinbase':
      return (
        <svg viewBox="0 0 1101.64 196.79" className={cn(s.coinbase, className)} {...rest}>
          <path
            fill="#0052ff"
            d="M222.34 54.94c-40.02 0-71.29 30.38-71.29 71.05s30.48 70.79 71.29 70.79 71.82-30.64 71.82-71.05c0-40.15-30.48-70.79-71.82-70.79zm.27 112.53c-22.79 0-39.49-17.7-39.49-41.47 0-24.04 16.43-41.73 39.22-41.73 23.06 0 39.75 17.96 39.75 41.73s-16.69 41.47-39.48 41.47zm80.29-81.62h19.88v108.3h31.8V57.58H302.9v28.27zM71.02 84.26c16.7 0 29.95 10.3 34.98 25.62h33.66c-6.1-32.75-33.13-54.94-68.37-54.94C31.27 54.94 0 85.32 0 126s30.48 70.79 71.29 70.79c34.45 0 62.01-22.19 68.11-55.21H106c-4.77 15.32-18.02 25.89-34.72 25.89-23.06 0-39.22-17.7-39.22-41.47.01-24.04 15.91-41.74 38.96-41.74zm836.1 28.53l-23.32-3.43c-11.13-1.58-19.08-5.28-19.08-14 0-9.51 10.34-14.26 24.38-14.26 15.37 0 25.18 6.6 27.3 17.43h30.74c-3.45-27.47-24.65-43.58-57.24-43.58-33.66 0-55.92 17.17-55.92 41.47 0 23.24 14.58 36.72 43.99 40.94l23.32 3.43c11.4 1.58 17.76 6.08 17.76 14.53 0 10.83-11.13 15.32-26.5 15.32-18.82 0-29.42-7.66-31.01-19.28h-31.27c2.92 26.68 23.85 45.43 62.01 45.43 34.72 0 57.77-15.85 57.77-43.06 0-24.3-16.69-36.98-42.93-40.94zM338.68 1.32c-11.66 0-20.41 8.45-20.41 20.07s8.74 20.07 20.41 20.07c11.66 0 20.41-8.45 20.41-20.07s-8.75-20.07-20.41-20.07zm466.68 103.02c0-29.58-18.02-49.39-56.18-49.39-36.04 0-56.18 18.23-60.16 46.23h31.54c1.59-10.83 10.07-19.81 28.09-19.81 16.17 0 24.12 7.13 24.12 15.85 0 11.36-14.58 14.26-32.6 16.11-24.38 2.64-54.59 11.09-54.59 42.79 0 24.57 18.29 40.41 47.44 40.41 22.79 0 37.1-9.51 44.26-24.57 1.06 13.47 11.13 22.19 25.18 22.19h18.55v-28.26h-15.64v-61.55zm-31.27 34.34c0 18.23-15.9 31.7-35.25 31.7-11.93 0-22-5.02-22-15.58 0-13.47 16.17-17.17 31.01-18.75 14.31-1.32 22.26-4.49 26.24-10.57v13.2zM605.28 54.94c-17.76 0-32.6 7.4-43.2 19.81V0h-31.8v194.15h31.27v-17.96c10.6 12.94 25.71 20.6 43.73 20.6 38.16 0 67.05-30.11 67.05-70.79s-29.42-71.06-67.05-71.06zm-4.77 112.53c-22.79 0-39.49-17.7-39.49-41.47s16.96-41.73 39.75-41.73c23.06 0 39.22 17.7 39.22 41.73 0 23.77-16.69 41.47-39.48 41.47zM454.22 54.94c-20.67 0-34.19 8.45-42.14 20.34v-17.7h-31.54v136.56h31.8v-74.22c0-20.87 13.25-35.66 32.86-35.66 18.29 0 29.68 12.94 29.68 31.7v78.19h31.8v-80.56c.01-34.35-17.74-58.65-52.46-58.65zm647.42 66.57c0-39.09-28.62-66.56-67.05-66.56-40.81 0-70.76 30.64-70.76 71.05 0 42.53 32.07 70.79 71.29 70.79 33.13 0 59.1-19.55 65.72-47.28h-33.13c-4.77 12.15-16.43 19.02-32.07 19.02-20.41 0-35.78-12.68-39.22-34.87h105.21v-12.15zm-103.36-10.57c5.04-19.02 19.35-28.26 35.78-28.26 18.02 0 31.8 10.3 34.98 28.26h-70.76z"
          />
        </svg>
      );
    case 'walletconnect':
      return (
        <svg viewBox="0 0 1459 238" className={cn(s.coinbase, className)} {...rest}>
          <g fill="none" fillRule="evenodd">
            <path
              fill="#3999FB"
              d="M526.77 130.22l-20.03 72.06h-20.82L458 96.83h22.87l16.6 76.36h.58l19.73-76.36h18.63l19.73 76.36h.59l16.66-76.36h22.87l-27.98 105.45h-20.83l-20.03-72.06h-.65zm99.9 57.88c9.28 0 16.95-6.06 16.95-14.54v-5.7l-16.52 1.02c-7.96.59-12.5 4.17-12.5 9.72 0 5.85 4.83 9.5 12.07 9.5zm-7.02 15.42c-14.9 0-26.24-9.64-26.24-23.75 0-14.25 10.97-22.5 30.48-23.68l19.73-1.17v-5.18c0-7.31-5.12-11.55-13.15-11.55-7.97 0-13.01 3.95-14.04 9.72h-19.5c.8-15.2 13.73-25.65 34.49-25.65 20.1 0 33.17 10.38 33.17 26.16v53.86H644v-11.99h-.44c-4.39 8.34-14.1 13.23-23.9 13.23zm59.2-1.24V96.83h21.33v105.45h-21.34zm36.24 0V96.83h21.34v105.45h-21.34zm70.89-64.24c-9.36 0-16.08 7.1-16.81 16.88h33.25c-.44-10-6.94-16.88-16.44-16.88zm16.73 40.27h19.59c-2.34 15.35-16.37 25.65-35.74 25.65-24.12 0-38.58-15.42-38.58-40.49 0-24.99 14.61-41.21 37.78-41.21 22.8 0 37.2 15.42 37.2 39.24v6.5h-54.01v1.32c0 11.18 7.09 18.86 17.98 18.86 7.82 0 13.8-3.88 15.78-9.87zm36.9-72.42h21.34v18.05h14.47v16.08h-14.47v37.49c0 5.99 2.93 8.84 9.21 8.84 1.9 0 3.88-.15 5.2-.37v15.71c-2.2.52-5.86.88-10.17.88-18.41 0-25.57-6.14-25.57-21.41v-41.14h-11.04v-16.08h11.04v-18.05zm95.96 98.22c-30.7 0-49.91-20.54-49.91-54.6 0-33.97 19.36-54.51 49.9-54.51 25.37 0 44.66 16.08 46.34 39.68h-21.49c-2.04-12.93-11.98-21.41-24.84-21.41-16.66 0-27.4 13.96-27.4 36.17 0 22.51 10.59 36.4 27.47 36.4 13.08 0 22.5-7.68 24.85-20.17h21.48c-2.48 23.53-20.53 38.44-46.4 38.44zm94.12-.15c-23.67 0-38.8-15.2-38.8-40.92 0-25.36 15.34-40.78 38.8-40.78 23.46 0 38.8 15.34 38.8 40.78 0 25.8-15.12 40.92-38.8 40.92zm0-16.3c10.45 0 17.1-8.84 17.1-24.55 0-15.57-6.72-24.56-17.1-24.56-10.37 0-17.17 9-17.17 24.56 0 15.71 6.65 24.55 17.17 24.55zm49.77 14.62v-78.34h20.6v13.96h.45c4.16-9.72 12.42-15.42 24.48-15.42 17.39 0 27.18 10.96 27.18 29.3v50.5h-21.34v-46.04c0-10.23-4.82-16.08-14.4-16.08-9.57 0-15.63 7.02-15.63 17.18v44.94h-21.34zm86.23 0v-78.34h20.61v13.96h.44c4.16-9.72 12.42-15.42 24.48-15.42 17.4 0 27.18 10.96 27.18 29.3v50.5h-21.33v-46.04c0-10.23-4.83-16.08-14.4-16.08s-15.64 7.02-15.64 17.18v44.94h-21.34zm121.39-64.24c-9.36 0-16.08 7.1-16.81 16.88h33.25c-.44-10-6.94-16.88-16.44-16.88zm16.73 40.27h19.59c-2.34 15.35-16.37 25.65-35.74 25.65-24.12 0-38.59-15.42-38.59-40.49 0-24.99 14.62-41.21 37.79-41.21 22.8 0 37.2 15.42 37.2 39.24v6.5h-54.01v1.32c0 11.18 7.09 18.86 17.98 18.86 7.81 0 13.8-3.88 15.78-9.87zm102.38-25.21h-19.8c-1.24-8.26-6.72-14.1-15.5-14.1-10.52 0-17.1 8.9-17.1 24.04 0 15.42 6.58 24.19 17.18 24.19 8.55 0 14.1-5.12 15.42-13.67h19.88c-1.1 18.49-14.91 30.4-35.52 30.4-23.6 0-38.59-15.35-38.59-40.92 0-25.14 14.99-40.78 38.44-40.78 21.2 0 34.64 13.08 35.6 30.84zm16.08-47.21h21.34v18.05h14.47v16.08h-14.47v37.49c0 5.99 2.92 8.84 9.2 8.84 1.9 0 3.88-.15 5.2-.37v15.71c-2.2.52-5.85.88-10.16.88-18.42 0-25.58-6.14-25.58-21.41v-41.14h-11.03v-16.08h11.03v-18.05z"
            />
            <path
              fill="#3B99FC"
              fillRule="nonzero"
              d="M79.5 46.54c63.22-61.9 165.7-61.9 228.93 0l7.6 7.45a7.8 7.8 0 010 11.2l-26.02 25.49a4.1 4.1 0 01-5.73 0l-10.47-10.25c-44.1-43.18-115.6-43.18-159.7 0L102.9 91.4a4.1 4.1 0 01-5.73 0L71.15 65.92a7.8 7.8 0 010-11.2l8.35-8.18zm282.75 52.7l23.16 22.68a7.8 7.8 0 010 11.2L280.97 235.4a8.22 8.22 0 01-11.45 0L195.4 162.8a2.05 2.05 0 00-2.86 0l-74.12 72.58a8.22 8.22 0 01-11.45 0L2.5 133.12a7.8 7.8 0 010-11.2l23.16-22.68a8.22 8.22 0 0111.45 0l74.13 72.58c.8.77 2.07.77 2.86 0l74.13-72.58a8.22 8.22 0 0111.44 0l74.13 72.58c.8.77 2.08.77 2.87 0l74.12-72.58a8.22 8.22 0 0111.45 0z"
            />
          </g>
        </svg>
      );
    default:
      return <svg />;
  }
};
