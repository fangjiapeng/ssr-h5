import * as React from 'react';
import { 
    useQuestionList,
    useCtx,
    useCurrAnswerSeq,
    useSelectedList,
    useAppDispatch,
} from '@/store/hooks';

import { SUBJECT_TYPE } from '@/commonUtils/const';

import Option from './option/option';
import Operation from './operation/operation';

import { QuestionItem } from '@/store/types';

import useStyles from 'isomorphic-style-loader/useStyles';
import * as styles from './question.less';

const Question: React.FC = () => {
    useStyles(styles)
    const questionList: QuestionItem[] = useQuestionList();
    const curAnswerSeq = useCurrAnswerSeq();
    const questionItem: QuestionItem | undefined  = questionList.find(item => item.sequence === curAnswerSeq);
    const {
        subjectType,
        sequence,
        question,
        optionList,
        answerAnalysis,
        userAnswer,
        subjectAnswer,
    } = questionItem || {};
    
    const questionType = {
        [SUBJECT_TYPE.SINGLE_CHOICE]: '单选题',
        [SUBJECT_TYPE.MULTIPLE_CHOICE]: '多选题',
        [SUBJECT_TYPE.TRUE_OR_FALSE]: '判断题',
    }
    return (
        <div className={styles.question}>
            <div className={styles["question-type"]}>{questionType[subjectType]}</div>
            <div className={styles["question-container"]}>
                <div className={styles["scroll-area"]}>
                    <div className={styles["question-content"]}>
                        <div className={styles["question-title"]}>
                            <div>{sequence}.&nbsp;</div><div dangerouslySetInnerHTML={{__html: question}}></div>
                        </div>
                        <div className={styles["question-options"]}>
                            {
                                optionList ? optionList.map(item => (
                                    <Option 
                                        key={item.option} 
                                        {...item}
                                    ></Option>
                                )) : null
                            }
                        </div>
                    </div>
                    {
                        userAnswer ? 
                        <div className={styles["answer-answerAnalysis"]}>
                            {
                                subjectType === SUBJECT_TYPE.TRUE_OR_FALSE ? 
                                <div className={styles["answer-result"]}>
                                    {
                                        userAnswer === subjectAnswer ?
                                        <>
                                            <div className={styles["correct-icon"]}></div>
                                            <div className={styles["correct-text"]}>回答正确</div>
                                        </>
                                        :
                                        <>
                                            <div className={styles["false-icon"]}></div>
                                            <div className={styles["false-text"]}>回答错误</div>
                                        </>
                                        
                                    }
                                </div> : null
                            }
                            <div className={styles["answerAnalysis-title"]}>
                                <div className={styles["analysis-icon"]}></div>
                                答案解析
                            </div>
                            <div className={styles["answerAnalysis-body"]}>
                                {
                                    answerAnalysis ? JSON.parse(answerAnalysis).map(([item, idx, arr]:[string, number, any[]]) => {
                                        return (
                                            arr.length === 1 && item === '<p><br></p>' ?
                                            <div key={idx} className={styles["answerAnalysis-item"]}>无</div>: 
                                            <div key={idx} className={styles["answerAnalysis-item"]} dangerouslySetInnerHTML={{__html: item}}></div>
                                        )
                                    }) : <div className={styles["answerAnalysis-item"]}>无</div>
                                }
                            </div>
                            
                        </div> : null
                    }
                    
                </div>
            </div>
            <Operation></Operation>
        </div>
    )
}

export default Question