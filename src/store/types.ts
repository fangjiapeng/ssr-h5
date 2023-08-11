
import store from '@/store/index';
import { AxiosInstance } from 'axios';
import * as Koa from 'koa';
import { 
    SUBJECT_TYPE, 
    ANSWER_STATUS,
    ANSWER_RESULT,
    OPTION_TYPE
} from '@/commonUtils/const';

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type HydrateAxiosInstance = {
    request: AxiosInstance,
    ctx?: Koa.ParameterizedContext
}

export type SubjectType = SUBJECT_TYPE.SINGLE_CHOICE | SUBJECT_TYPE.MULTIPLE_CHOICE | SUBJECT_TYPE.TRUE_OR_FALSE;
export type AnswerStatus = ANSWER_STATUS.YES | ANSWER_STATUS.NO;
export type OptionType = OPTION_TYPE.IMG | OPTION_TYPE.TEXT;
export type AnswerResult = ANSWER_RESULT.CORRECT | ANSWER_RESULT.FALSE;

export type OptionItem = {
    optionContent: string,
    optionType: OptionType,
    option: string,
    result: AnswerResult,
    sort: number
}

export type QuestionItem = {
    id: number,
    subjectType: SubjectType,
    sequence: number,
    question: string,
    status: AnswerStatus,
    subjectAnswer: string,
    answerAnalysis: string,
    userAnswer: string,
    optionList: OptionItem[],
    projectId: number,
}

export type HomeState = {
    lessonName: string,
    lessonId: string,
    curAnswerSeq: number,
    questionList: QuestionItem[],
    selectedList: number[],
}