export interface htmlTagObj {
  id: number;
  rootElement: string;
  styles: stylesType[];
  childElements: htmlTagObj[]
}

export interface stylesType {
  [key: string]: string;
}

export interface initialStateType {
  allHtmlTags: htmlTagObj[],
  switchControl: string,
  currentSelectedTag: htmlTagObj | null
}