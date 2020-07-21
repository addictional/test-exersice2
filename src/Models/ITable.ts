import {IResponseRow,IResponseDTO} from './ITableDTO';

export default interface ITable{
    isLoading : boolean;
    users : IResponseDTO;
}