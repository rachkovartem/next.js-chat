import Tooltip from '@mui/material/Tooltip';
import {ReactElement} from "react";

export const ArrowTooltips = ({element, text, placement}: {element: ReactElement, text: string, placement: 'left'}) => {
  return (
    <Tooltip title={text} placement={placement} arrow>
      {element}
    </Tooltip>
  );
}