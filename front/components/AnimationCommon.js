import { keyframes } from "styled-components";

export const headerMenu = keyframes`
0%{
  top: 0;
  opacity: 0;
  visibility:hidden;
}
100%{
  bottom:inherit;
  top:100px;
  opacity: 1;
  visibility:visible;
}
`;

export const mobileMenu = keyframes`
0%{
  height:0;
  opacity: 0;
  visibility:hidden;
}
100%{
  height: calc(100vh - 80px);
  opacity: 1;
  visibility:visible;
}
`;

export const textAni = keyframes`
0%{
  transform: translateY(180px);
  opacity: 0;
}
100%{
  transform: translateY(0);
  opacity: 1;
}
`;
