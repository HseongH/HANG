import { css } from 'styled-components';
// mixin
import { flexBox } from 'src/styles/Mixin';

interface Prop {
  theme: {
    [propName: string]: any;
  };
}

const ImageWrapper = css<Prop>`
  height: calc(100% - 230px);

  a {
    text-indent: -9999px;
    overflow: hidden;
    height: 100%;
    ${flexBox('center', 'center')};
  }

  img {
    max-height: 544.5px;
  }
`;

export default ImageWrapper;
