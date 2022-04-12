import LinesEllipsis from "react-lines-ellipsis";


export const EllipseText = ({text, maxLine}: {text: string, maxLine: number}) => {
    return  <LinesEllipsis
      text={text}
      maxLine={maxLine.toString()}
      ellipsis='...'
      component='div'
      basedOn='letters'
    />
}