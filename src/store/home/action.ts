import * as actions from '@/store/const';
import { QuestionItem, AppDispatch, RootState, HydrateAxiosInstance } from '@/store/types';
import { getParams } from '@/client/utils';
import * as Koa from 'koa';
import { SUBJECT_TYPE, ANSWER_STATUS } from '@/commonUtils/const';
import * as _ from 'lodash';

export const setQuestion = (list: QuestionItem[]) => {
    return {
        type: actions.SET_QUESTION,
        payload: list
    }
}

export const setLessonId = (id: number) => {
    return {
        type: actions.SET_LESSON_ID,
        payload: id
    }
}

export const setCurAnswerSeq = (seq: number) => {
    return {
        type: actions.SET_CURR_ANSWER_SEQ,
        payload: seq
    }
}

export const getQuestion = () => {
    return (dispatch: AppDispatch, getState: () => RootState, requestInstance: HydrateAxiosInstance) => {
        return new Promise(async (resolve: any, reject: any) => {
            const ctx: Koa.ParameterizedContext | undefined  = requestInstance.ctx;
            const res: any = await requestInstance.request({
                method: 'GET',
                params: {
                    lessonId: ctx ? ctx.request.query.lessonId : getParams('lessonId'),
                    exerciseType: ctx ? ctx.request.query.exerciseType : getParams('exerciseType'),
                },
                url: '/gzcourse/classSubject/getQuestionList'
            })
            if(res.success) {
                dispatch(setQuestion(res.data.questionList));
                dispatch(setCurAnswerSeq(res.data.curAnswerSeq));
                dispatch(setLessonId(res.data.lessonId));
            }
            resolve();
        })
    }
}

export const setSelectedList = (list: number[])  => {
    return {
        type: actions.SET_SELECTED_LIST,
        payload: list
    }
};

export const clickOption = (optionSort: number) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const { 
            curAnswerSeq, 
            questionList, 
            selectedList,
        } = getState().home;
        const currentQuestion: QuestionItem = questionList.find(item => item.sequence === curAnswerSeq);
        const userAnswer: string = currentQuestion.userAnswer;
        if(userAnswer) {
            // 题目已经作答过了
            return;
        }
        const newSelectedOptions: number[] = [...selectedList];
        if(currentQuestion.subjectType === SUBJECT_TYPE.MULTIPLE_CHOICE) {
            // 多选题可以取消勾选
            const idx: number = newSelectedOptions.findIndex(item => item === optionSort);
            if(idx > -1) {
                newSelectedOptions.splice(idx, 1);
                dispatch(setSelectedList(newSelectedOptions));
            } else {
                newSelectedOptions.push(optionSort);
                dispatch(setSelectedList(newSelectedOptions.sort((a,b)=>(a-b))));
            }
        } else if(currentQuestion.subjectType === SUBJECT_TYPE.SINGLE_CHOICE || currentQuestion.subjectType === SUBJECT_TYPE.TRUE_OR_FALSE) {
            // 单选题和判断题逻辑一样
            if(newSelectedOptions[0] === optionSort) {
                return;
            } else {
                newSelectedOptions.splice(0, 1, optionSort);
            }
            dispatch(setSelectedList(newSelectedOptions));
        }
    }
}

export const submit = () => {
    return async (dispatch: AppDispatch, getState: () => RootState, requestInstance: HydrateAxiosInstance) => {
        const { 
            curAnswerSeq, 
            questionList, 
            selectedList,
        } = getState().home;
        if(selectedList.length === 0) {
            return;
        }
        const currentQuestion: QuestionItem = questionList.find(item => item.sequence === curAnswerSeq);
        const res: any = await requestInstance.request({
            method: 'POST',
            data: {
                subjectId: currentQuestion.id,
                answer: selectedList.join(','),
                lessonId: getParams('lessonId'),
            },
            url: '/gzcourse/classSubject/submitAnswer',
            headers: {
                contentType: 'application/x-www-form-urlencoded'
            }
        });
        if(res.success) {
            // 更新questionList
            const newQuestionList: QuestionItem[] = _.cloneDeep(questionList);
            newQuestionList.forEach(item => {
                if(item.sequence === curAnswerSeq) {
                    item.userAnswer = res.data.userAnswer;
                    item.status = ANSWER_STATUS.YES;
                    item.subjectAnswer = res.data.answer;

                }
            })
            dispatch(setQuestion(newQuestionList));
        }
    }
}

export const nextQuestion = () => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setSelectedList([]));
        dispatch({
            type: actions.NEXT_QUESTION
        })
    }
}

export const prevQuestion = () => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setSelectedList([]));
        dispatch({
            type: actions.PREV_QUESTION
        })
    }
}