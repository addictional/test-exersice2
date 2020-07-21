export interface IResponseRow {
    id : number;
    firstName : string;
    lastName : string;
    age : number;
    city : string;
    visits : number;
} 

export interface IResponseDTO extends Array<IResponseRow> {};