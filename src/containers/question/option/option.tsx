import * as React from 'react';
import { OptionType, AnswerResult } from '@/store/types';

import { 
    useQuestionList,
    useCurrAnswerSeq,
    useSelectedList,
    useAppDispatch,
} from '@/store/hooks';

import { 
    OPTION_TYPE,
} from '@/commonUtils/const';
import { clickOption } from '@/store/home/action';

import useStyles from 'isomorphic-style-loader/useStyles';
import * as styles from './option.less';

const Option: React.FC<{
    optionContent: string,
    optionType: OptionType,
    option: string,
    result: AnswerResult,
    sort: number,
}> = (props)=> {
    useStyles(styles);
    const dispatch = useAppDispatch();
    const questionList = useQuestionList();
    const curAnswerSeq = useCurrAnswerSeq();
    const selectedList = useSelectedList();

    const currentQuestion = questionList.find(item => item.sequence === curAnswerSeq);
    const userAnswer = currentQuestion.userAnswer;

    const getOptionItemClassName = () => {
        if(!!userAnswer) {
            const answerList = currentQuestion.subjectAnswer.split(',').map(item => Number(item));
            const userAnswerList = userAnswer.split(',').map(item => Number(item));
            // 已作答
            if(answerList.indexOf(props.sort) > -1) {
                // 正确答案标绿
                return styles['selected-correct']
            }
            if(userAnswerList.indexOf(props.sort) > -1) {
                // 错选标红
                return styles['selected-false']
            }
            return ;
        } else {
            // 未作答
            return selectedList.indexOf(props.sort) > -1 ? `${styles['selected-temp']} ${styles['clickable']}` : styles['clickable']
        }
    }
    return props.optionContent ? (
        <div 
            className={`${styles['option-item']} ${getOptionItemClassName()}`} 
            onClick={() => dispatch(clickOption(props.sort))}
        >
            <div className={styles.leeter}>{props.option}</div>
            <div className={styles["option-content"]}>
                {
                    props.optionType === OPTION_TYPE.TEXT ?
                    <div className={styles["type-text"]}>{props.optionContent}</div> : null
                }
                {
                    props.optionType === OPTION_TYPE.IMG ?
                    <div className={styles["type-img"]}>
                        <img src={props.optionContent} alt="" />
                    </div> : null
                }
            </div>
        </div>
    ) : null
}


export default Option;