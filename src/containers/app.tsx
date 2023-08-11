import * as React from 'react';
import Progress from '@/containers/progress/progress';
import Question from '@/containers/question/question';

import { 
    useQuestionList,
    useCtx,
} from '@/store/hooks';
import {
    getQuestion
} from '@/store/home/action';
import * as Koa from 'koa';
import { callNative, getParams } from '@/client/utils/index';

import useStyles from 'isomorphic-style-loader/useStyles';
import * as styles from './app.less';
import '@/styles/reset.less';

const App: FunctionComponent = () => {
    useStyles(styles);
    const ctx: Koa.ParameterizedContext | undefined = useCtx();
    const platform: string = ctx ? ctx.request.query.platform : getParams('platform');
    return (
        <div className={styles.home}>
            <div className={styles.header}>
                {
                    platform === 'PC' ? null : 
                    <div className={styles["go-back-btn"]} onClick={() => callNative('navigatorBack', 'goBack')}></div>
                }
                {
                    ctx ? ctx.request.query.lessonName : getParams('lessonName')
                }
            </div>
            <Question/>
            <Progress/>
        </div>
    )
}

App.loadData = (store) => {
    return store.dispatch(getQuestion());
}

export default App;