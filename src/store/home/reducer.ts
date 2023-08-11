import * as actions from '@/store/const';
import { 
    SUBJECT_TYPE, 
    ANSWER_STATUS,
    ANSWER_RESULT,
    OPTION_TYPE
} from '@/commonUtils/const';
import { getParams } from '@/client/utils/index';
import { HomeState } from '@/store/types';
import { AnyAction } from 'redux';

const defaultState: HomeState = {
    lessonName: '课次名称课次名称课次名称课次名称',
    lessonId: '',
    curAnswerSeq: 1,
    questionList: [],
    selectedList: [],
}

export default (state = defaultState, action: AnyAction): HomeState => {
    switch(action.type) {
        case actions.SET_QUESTION: 
            return {
                ...state,
                questionList: action.payload
            };
        case actions.SET_SELECTED_LIST:
            return {
                ...state,
                selectedList: action.payload
            }
        case actions.NEXT_QUESTION:
            return {
                ...state,
                curAnswerSeq: state.curAnswerSeq + 1
            }
        case actions.PREV_QUESTION:
            return {
                ...state,
                curAnswerSeq: state.curAnswerSeq - 1
            }
        case actions.SET_LESSON_ID:
            return {
                ...state,
                lessonId: action.payload
            }
        case actions.SET_CURR_ANSWER_SEQ:
            return {
                ...state,
                curAnswerSeq: action.payload
            }
        default: 
            return state;
    }
}