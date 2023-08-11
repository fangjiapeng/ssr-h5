import * as React from 'react';
import { 
    useQuestionList,
} from '@/store/hooks';

import useStyles from 'isomorphic-style-loader/useStyles';
import * as styles from './progress.less';

const Progress: FunctionComponent = () => {
    useStyles(styles);
    const questionList = useQuestionList();
    const answeredQuestions = questionList.filter(item => !!item.userAnswer);
    return (
        <div className={styles.progress}>
            <div className={styles.icon}></div>
            <div className={styles["progress-text"]}>
                {
                    `答题进度：${answeredQuestions.length}/${questionList.length}`
                }
            </div>
            <div className={styles["progress-bar"]}>
                <div className={styles.inner}>
                    {
                        questionList.length ? 
                        <div 
                            className={styles["answer-progres"]}
                            style={{
                                width: Math.floor(answeredQuestions.length / questionList.length * 100) + '%'
                            }}
                        ></div> : null
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Progress;