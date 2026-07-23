const PROJECT_QA_DATA = {
    "proj-01": [
        {
            question: "다음 테이블 인스턴스 차트를 기반으로 테이블을 생성하십시오. (MEMBER, TITLE, TITLE_COPY, RENTAL, RESERVATION)",
            code: `
CREATE TABLE MEMBER (
    MEMBER_ID NUMBER(10) CONSTRAINT MEMBER_MEMBER_ID_PK PRIMARY KEY,
    LAST_NAME VARCHAR2(25) CONSTRAINT MEMBER_LAST_NAME_NN NOT NULL,
    FIRST_NAME VARCHAR2(25),
    ADDRESS VARCHAR2(100),
    CITY VARCHAR2(30),
    PHONE VARCHAR2(15),
    JOIN_DATE DATE DEFAULT SYSDATE CONSTRAINT MEMBER_JOIN_DATE_NN NOT NULL
);

-- (나머지 테이블 생성 쿼리 작성)
            `
        },
        {
            question: "MEMBER 테이블 및 TITLE 테이블의 각 행을 고유하게 식별하는 시퀀스를 생성하십시오.",
            code: `
CREATE SEQUENCE MEMBER_ID_SEQ START WITH 101 NOCACHE;
CREATE SEQUENCE TITLE_ID_SEQ START WITH 92 NOCACHE;
            `
        },
        {
            question: "영화 제목, 대여 가능 여부, 반환 예정일을 표시하는 TITLE_AVAIL 뷰를 생성하십시오.",
            code: `
CREATE VIEW TITLE_AVAIL AS
SELECT T.TITLE, C.COPY_ID, C.STATUS, R.EXP_RET_DATE
FROM TITLE T
JOIN TITLE_COPY C ON T.TITLE_ID = C.TITLE_ID
LEFT JOIN RENTAL R ON C.COPY_ID = R.COPY_ID AND C.TITLE_ID = R.TITLE_ID;
            `
        },
        {
            question: "고객별 대여 이력을 출력하는 Customer History Report 쿼리를 작성하십시오.",
            code: `
SELECT M.FIRST_NAME || ' ' || M.LAST_NAME AS MEMBER,
       T.TITLE,
       R.BOOK_DATE,
       (R.ACT_RET_DATE - R.BOOK_DATE) AS DURATION
FROM MEMBER M
JOIN RENTAL R ON M.MEMBER_ID = R.MEMBER_ID
JOIN TITLE T ON R.TITLE_ID = T.TITLE_ID;
            `
        }
    ]
    // 나중에 다른 프로젝트가 생기면 "proj-02": [ ... ] 이런 식으로 계속 추가하면 돼!
};
