export class SearchForm {
  type: string;
  title: string;
  name: string;
  placeholder: string;
  show?:boolean;
  options?:[{name:string;value:string;}]
}