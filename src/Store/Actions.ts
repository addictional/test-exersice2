import {UPDATE,REVERT,FETCH_BEGIN,FETCH_END} from './Types';
import {IResponseDTO} from '../Models/ITableDTO';
import {ThunkAction} from 'redux-thunk';
import ITable from '../Models/ITable';
import AwesomeService from '../Services/AwesomeService';

const Service = new AwesomeService();

interface IFetchBeginAction {
    type : FETCH_BEGIN;
}

interface IFetchEndAction {
    type : FETCH_END;
    payload : IResponseDTO
}

interface IFetchRevertAction {
    type : REVERT;
    payload : {id : number}
}

interface IUpdatableFields {
    firstName : string;
    lastName : string;
    visits : number;
}

interface INotUpdatableField {
    id : number;
}

interface IFetchUpdateAction {
    type : UPDATE;
    payload : IUpdatableFields & INotUpdatableField
}

export type IActions  = IFetchBeginAction | IFetchEndAction | IFetchUpdateAction;

type ThunkResult<R> = ThunkAction<
  R,
  ITable,
  undefined,
  IActions
>;

function fetchBegin() : IFetchBeginAction {
    return {
        type : '@FETCH_BEGIN'
    }
}

function fetchEnd(data : IResponseDTO) : IFetchEndAction {
    return {
        type : '@FETCH_END',
        payload : data
    }
}


export function update(data : IUpdatableFields & INotUpdatableField) : IFetchUpdateAction {
    return {
        type : '@UPDATE_USER',
        payload : data
    }
}


export function init() : ThunkResult<Promise<void>> {
    return async function(dispatch, getState){
        dispatch(fetchBegin());
        const data = await Service.read();
        dispatch(fetchEnd(data));
    }
}