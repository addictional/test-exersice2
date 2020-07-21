import {STATE} from './State';
import {Reducer} from 'redux';
import ITable from '../Models/ITable';
import {IActions} from './Actions';


export const reducer : Reducer<ITable,IActions> = (state = STATE,action) => {
    switch (action.type) {
        case '@FETCH_BEGIN': {
            return {...state,isLoading : true}
        }
        case '@FETCH_END': {
            return {...state, users : action.payload, isLoading : false,}
        }
        case '@UPDATE_USER' : {
            const data = action.payload;
            const user = state.users.find(({id})=> id === data.id);
            if(user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.visits = data.visits;
            }
            return {...state}
        }
        default : 
            return {...state}
    }
}