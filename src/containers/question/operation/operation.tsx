import * as React from 'react';
import { 
    useQuestionList,
    useCtx,
    useCurrAnswerSeq,
    useSelectedList,
    useAppDispatch,
} from '@/store/hooks';

import {
    clickOption,
    submit,
    nextQuestion,
    prevQuestion,
} from '@/store/home/action';
import { callNative, getParams } from '@/client/utils/index';
import { QuestionItem } from '@/store/types';
import * as Koa from 'koa';

import useStyles from 'isomorphic-style-loader/useStyles';
import * as styles from './operation.less';

const OptionButton: React.FC<{
    active: boolean,
    onClick: Function,
    optionText: string,
    sort: number,
}> = (props) => {
    useStyles(styles);
    return (
        <div
            className={`${styles['option-btn']} ${props.active ? styles['option-btn-active'] : ''}`}
            onClick={() => { props.onClick(props.sort) }}
        >
            {props.optionText}
        </div>
    )
}

const Operation: React.FC = () => {
    useStyles(styles);
    const dispatch = useAppDispatch();
    const ctx: Koa.ParameterizedContext | undefined = useCtx();
    const questionList: QuestionItem[] = useQuestionList();
    const curAnswerSeq = useCurrAnswerSeq();
    const selectedList = useSelectedList();
    const platform: string = ctx ? ctx.request.query.platform : getParams('platform');

    const currentQuestion: QuestionItem | undefined = questionList.find(item => item.sequence === curAnswerSeq);
    const userAnswer: string | undefined = currentQuestion?.userAnswer;
    const answerList: number[] = currentQuestion?.subjectAnswer ? currentQuestion.subjectAnswer.split(',').map(item => Number(item)) : [];
    const userAnswerList: number[] = userAnswer ? userAnswer.split(',').map(item => Number(item)) : [];
    return questionList.length > 0 ? (
        <div className={styles["operation-area"]}>
            <div className={styles.left}>
                {
                    userAnswer ?
                        <div className={styles["has-submit"]}>
                            <div className={styles["my-answers"]}>
                                <div className={styles.tips}>我的答案</div>
                                <div className={styles["btn-groups"]}>
                                    {
                                        currentQuestion.optionList ? currentQuestion.optionList.filter(item => (
                                            userAnswerList.indexOf(item.sort) > -1
                                        )).map(item => (
                                            <OptionButton
                                                key={item.option}
                                                optionText={item.option}
                                                onClick={(optionSort: number) => dispatch(clickOption(optionSort))}
                                                active={true}
                                                sort={item.sort}
                                            />
                                        )) : null
                                    }
                                </div>
                            </div>
                            <div className={styles["standard-answers"]}>
                                <div className={styles.tips}>参考答案</div>
                                <div className={styles["btn-groups"]}>
                                    {
                                        currentQuestion.optionList ? currentQuestion.optionList.filter(item => (
                                            answerList.indexOf(item.sort) > -1
                                        )).map(item => (
                                            <OptionButton
                                                key={item.option}
                                                optionText={item.option}
                                                onClick={(optionSort: number) => dispatch(clickOption(optionSort))}
                                                active={false}
                                                sort={item.sort}
                                            />
                                        )) : null
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div className={styles["select-area"]}>
                            <div className={styles.tips}>请选择</div>
                            <div className={styles["btn-groups"]}>
                                {
                                    currentQuestion.optionList ? currentQuestion.optionList.map(item => (
                                        <OptionButton
                                            key={item.option}
                                            optionText={item.option}
                                            onClick={(optionSort: number) => dispatch(clickOption(optionSort))}
                                            active={selectedList.indexOf(item.sort) > -1}
                                            sort={item.sort}
                                        />
                                    )) : null
                                }
                            </div>
                        </div>
                }
            </div>
            <div className={styles.right}>
                {
                    userAnswer ?
                        <div className={styles["switch-question-btns"]}>
                            {
                                curAnswerSeq > 1 ?
                                    <div className={styles["prev-btn"]} onClick={() => dispatch(prevQuestion())}>上一题</div> : null
                            }
                            {
                                curAnswerSeq < questionList.length ?
                                    <div className={styles["next-btn"]} onClick={() => dispatch(nextQuestion())}>下一题</div> :
                                    (
                                        platform === 'PC' ? null :
                                        <div className={styles["next-btn"]} onClick={() => callNative('navigatorBack', 'goBack')}>回答完毕，返回首页</div>
                                    )
                            }
                        </div>
                        :
                        <div className={styles["switch-question-btns"]}>
                            <div
                                onClick={() => dispatch(submit())}
                                className={`${styles['submit-btn']} ${selectedList.length === 0 ? styles['submit-btn-disabled'] : ''}`}
                            >
                                提交
                            </div>
                        </div>
                        
                }
            </div>
        </div>
    ) : null
}


export default Operation;