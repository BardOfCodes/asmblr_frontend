import { Presets } from "rete-react-plugin";
import { css } from "styled-components";


const styles = css<{ selected?: boolean }>`
  background: #D2E8E3;
  border-color: #2C3532;
  color: #646464;
  .title {
    color: #646464;
    font-size: 1.5em;
  }
.output-title{
    color: #646464;
}
.input-title{
    color: #646464;
}
  &:hover {
    background: #f2f2f2;
  }
  .output-socket {
  color: #646464;
  }
  .input-socket {
  color: #646464;
  }
  ${(props) =>
    props.selected &&
    css`
      border-color: red;
      background: #FFCB9A;

      &:hover {
        background: #FFCB9A;
      }
    `}
`;

export function StyledNode(props: any) {
  return <Presets.classic.Node styles={() => styles} {...props} />;
}
