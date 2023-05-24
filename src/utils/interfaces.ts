//interface used for saving conversions in state and strorage
export interface Conversion {
  pxValue: number;
  remValue: number;
}

//interface used for saving projects in state and storage
export interface Project {
  id: number;
  name: string;
  conversions: Conversion[];
}