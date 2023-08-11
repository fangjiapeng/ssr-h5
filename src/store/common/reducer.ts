import * as actions from '../const';
import { AnyAction } from 'redux';

interface CommonState {
    value: number,
  }

const defaultState: CommonState = {
    value: 0,
}

export default (state = defaultState, action: AnyAction): CommonState => {
    switch(action.type) {
        case actions.TEST: 
            return {
                ...state,
                value: state.value + 1
            };
        default: 
            return state;
    }
}