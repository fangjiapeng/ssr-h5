import { RootState, QuestionItem } from '@/store/types';

export const selectValue = (state: RootState) => state.common.value;

export const selectQuestionList = (state: RootState): QuestionItem[]  => state.home.questionList;

export const selectCtx = (state: RootState) => state.ctx?.ctx;
