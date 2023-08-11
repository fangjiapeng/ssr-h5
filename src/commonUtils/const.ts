export const STATUS_CODE = {
    SUCCESS: '000001',
    NO_LOGIN: '200400'
}

// 题目类型
export enum SUBJECT_TYPE  {
    SINGLE_CHOICE = 1, // 单选题,事实上单选题的英文是multiple choice question
    MULTIPLE_CHOICE = 5, // 多选题
    TRUE_OR_FALSE = 2, // 判断题
}

export enum ANSWER_STATUS {
    YES = 1,
    NO = 2
}

export enum ANSWER_RESULT {
    CORRECT = 1,
    FALSE = 2
}

export enum OPTION_TYPE  {
    TEXT = 1,
    IMG = 2
}