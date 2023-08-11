import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/types';
import { 
    selectQuestionList, 
    selectCtx 
} from '@/store/selectors';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useQuestionList = () => useAppSelector(selectQuestionList);
export const useCtx = () => useAppSelector(selectCtx);
export const useCurrAnswerSeq = () => useAppSelector(state => state.home.curAnswerSeq);
export const useSelectedList = () => useAppSelector(state => state.home.selectedList);