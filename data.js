// data.js
// 포트폴리오에 들어갈 모든 데이터 정의

const DATA = {
    // 1. 트러블슈팅 데이터 (상세 보기 데이터 추가 버전)
    troubleshooting: [
        {
            id: "ts-01", 
            title: "특정 집계 쿼리 타임아웃 발생 및 인덱스 재구성을 통한 개선",
            context: "대용량 결제 테이블에서 특정 기간 조회 시 5초 이상 소요되며 가끔 시스템 타임아웃 발생.",
            result: "조회 응답 속도 96% 개선 (5.2초 -> 0.2초), CPU Peak 부하 안정화.",
            code: SQL_QUERIES.ts01,
            relatedArchId: "arch-03", // ⭐️ 연결 고리: 3번 백서(성능 튜닝 백서)와 연동됩니다.
            details: [
                {
                    subtitle: "🔍 문제 진단 및 원인 분석 과정 (Deep Dive)",
                    content: "오라클 AWR(Automatic Workload Repository) 보고서와 <code>EXPLAIN PLAN</code>을 통해 해당 쿼리가 <code>HASH JOIN</code> 및 <code>SORT MERGE JOIN</code>을 수행하는 과정에서 대규모 임시 세그먼트(Temp Segment)를 디스크에 쓰고 있는 것을 발견했습니다. 기존 인덱스는 컬럼의 카디널리티(선택도)를 고려하지 않고 <code>STATUS</code>가 선두 컬럼으로 잡혀 있어, 실제 범위 검색 조건인 <code>CREATED_AT</code>의 장점을 전혀 활용하지 못하고 Full Table Scan에 준하는 Cost가 발생하고 있었습니다."
                },
                {
                    subtitle: "🛠️ 튜닝 시나리오 및 검증 절차",
                    content: "1단계로 선두 컬럼을 범위 검색 조건인 <code>CREATED_AT</code>으로 변경한 복합 인덱스를 생성했습니다. 2단계로 오라클 옵티마이저가 올바른 인덱스를 강제 인지할 수 있도록 쿼리에 <code>INDEX</code> 힌트를 명시했습니다. 테스트 환경에서 1,500만 건의 더미 데이터를 적재한 후 스트레스 테스트를 수행한 결과, 블록 I/O(Logical Reads) 수치가 기존 대비 1/50 수준으로 급감하는 전 과정을 SQL Trace(tkprof)를 통해 정량적으로 검증 완료했습니다."
                }
            ]
        },
        {
            id: "ts-02", 
            title: "text",
            context: "text",
            result: "text",
            code: SQL_QUERIES.ts02,
            relatedArchId: "arch-01", // ⭐️ 예시: 1번 백서와 연결
            details: [
                { subtitle: "🔍 text", content: "text" },
                { subtitle: "🛠️ text", content: "text" }
            ]
        },
        {
            id: "ts-03", 
            title: "text",
            context: "text",
            result: "text",
            code: SQL_QUERIES.ts03,
            relatedArchId: "arch-02", // ⭐️ 예시: 2번 백서와 연결
            details: [
                { subtitle: "🔍 text", content: "text" },
                { subtitle: "🛠️ text", content: "text" }
            ]
        },
    ],

    // 2. 아키텍처 및 백서 데이터 (2x2 Zero Downtime 구조 - 시각화 버전)
    architecture: [
        {
            id: "arch-01",
            pillar: "STABILITY",
            icon: "fas fa-shield-alt",
            title: "엔터프라이즈 DB 표준 환경 구축",
            summary: "단순 설치를 넘어, Linux 커널 튜닝부터 ASM 스토리지 구성까지 최적의 베이스 라인을 설계한 아키텍처입니다.",
            tags: ["Oracle 19c", "Linux", "ASM"],
            content: `<div class="p-5 text-gray-300">STABILITY 관련 상세 백서 내용이 들어갈 자리입니다.</div>`
        },
        {
            id: "arch-02",
            pillar: "AVAILABILITY",
            icon: "fas fa-server",
            title: "Data Guard & RAC 고가용성 구성",
            summary: "장애 발생 시 자동으로 대기 서버가 역할을 승계(Failover)하여 다운타임을 최소화하는 무중단 아키텍처입니다.",
            tags: ["Data Guard", "RAC", "Failover"],
            content: `<div class="p-5 text-gray-300">AVAILABILITY 관련 상세 백서 내용이 들어갈 자리입니다.</div>`
        },
        {
            id: "arch-03",
            pillar: "RESILIENCE",
            icon: "fas fa-life-ring",
            title: "RMAN 무손실 백업 및 복구",
            summary: "디스크 손상 등 치명적 장애 상황을 가정한 제로 데이터 유실(Zero Data Loss) 복구 시나리오 파이프라인입니다.",
            tags: ["RMAN", "Backup", "Recovery"],
            content: `<div class="p-5 text-gray-300">RESILIENCE 관련 상세 백서 내용이 들어갈 자리입니다.</div>`
        },
        {
            id: "arch-04",
            pillar: "SCALABILITY",
            icon: "fas fa-project-diagram",
            title: "대용량 트랜잭션 분산 처리",
            summary: "수천만 건의 데이터를 병렬로 빠르게 처리하기 위한 하이엔드 인프라(Exadata 등) 활용 아키텍처입니다.",
            tags: ["Exadata", "Big Data", "Tuning"],
            content: `<div class="p-5 text-gray-300">SCALABILITY 관련 상세 백서 내용이 들어갈 자리입니다.</div>`
        }
    ],

    // 3. 외부 블로그 링크 데이터
   blogLogs: [
       {
            date: "2026-07-13",
            title: "15회차 - 오라클 SQL 함수,형변환,치환 변수&&",
            summary: "문자, 숫자, 날짜 처리를 위한 오라클 내장 함수를 숙달하고 데이터 타입의 명시적·묵시적 형변환을 적용해 보았으며, 이중 치환 변수(&&)를 활용한 동적 쿼리 작성 실습을 진행하며 복잡한 데이터 가공 및 재사용성 높은 SQL 튜닝 과정을 경험했습니다.",
            tags: ["Oracle"],
            link: "https://blog.naver.com/10soong/224345468524"
        },
       {
            date: "2026-07-10",
            title: "14회차 - 오라클 SQL 실습(SELECT절, FROM절, WHERE절)",
            summary: "오라클 SQL의 핵심인 SELECT, FROM, WHERE 절을 활용하여 데이터베이스 내 데이터를 조건별로 필터링하고 원하는 구조로 추출하는 쿼리 작성 실습을 진행하며, 정밀한 데이터 조회 및 관계형 데이터베이스(RDB) 조작법 전반을 경험했습니다.",
            tags: ["Oracle"],
            link: "https://blog.naver.com/10soong/224342753990"
        },
       {
            date: "2026-07-09",
            title: "13회차 - 오라클 접속 권한 공유, SQL*Plus 커맨드",
            summary: "SQL*Plus 툴을 활용한 데이터베이스 제어 명령어를 숙달하고, 사용자 계정 생성부터 데이터베이스 관리자(DBA) 권한을 포함한 시스템 및 객체 접근 권한(Grant/Revoke) 부여 프로세스를 직접 실행해 보았습니다.",
            tags: ["Oracle","Linux"],
            link: "https://blog.naver.com/10soong/224341668109"
        },
       {
            date: "2026-07-08",
            title: "12회차 - 오라클11g 설치, 파라미터 설정, network 연결, putty로 접속",
            summary: "Oracle 11g 데이터베이스 설치 및 인프라 구축 프로세스를 진행하며 커널 파라미터 최적화와 리스너(Listener) 및 tnsnames 설정을 통한 네트워크 연동을 완료하였고, Putty를 활용한 원격 CLI 접속 환경을 구축하여 데이터베이스 관리 전반을 경험했습니다.",
            tags: ["Oracle","Linux"],
            link: "https://blog.naver.com/10soong/224340612409"
        },
       {
            date: "2026-07-07",
            title: "11회차 - 리눅스 커맨드 및 구조, Vi 커맨드, 파일 디렉토리 수정 커맨드",
            summary: "리눅스 핵심 명령어를 활용한 시스템 제어와 Vi 에디터를 통한 환경 설정 파일 편집을 진행했으며, 디렉터리 구조 분석 및 파일 권한 수정을 통해 리눅스 파일 시스템 관리 전반을 경험했습니다.",
            tags: ["Linux"],
            link: "https://blog.naver.com/10soong/224339414144"
        },
       {
            date: "2026-07-06",
            title: "10회차 - 리눅스 VMware11, Oracle Enterprise Linux5.8 설치",
            summary: "VMware 11 기반의 Oracle Enterprise Linux 5.8 설치를 진행하며 가상화 환경 구축 및 OS 배치 과정을 경험했습니다.",
            tags: ["Linux"],
            link: "https://blog.naver.com/10soong/224338338262"
        },
       {
            date: "2026-07-03",
            title: "9회차 - 파이썬 클래스변수, 매직매서드, 상속, 오버라이딩",
            summary: "파이썬 여러 객체가 함께 쓰는 데이터를 관리하는 클래스 변수와 객체의 행동을 내 마음대로 설정하는 매직 메서드를 다뤄보았습니다. 또한, 기존 코드를 그대로 물려받아 다시 쓰는 상속과 부모 클래스의 기능을 내 입맛에 맞게 바꾸는 오버라이딩을 직접 구현해 보면서, 코드를 더 효율적으로 짜고 재사용하는 객체지향의 기본 원리를 경험했습니다.",
            tags: ["Python"],
            link: "https://blog.naver.com/10soong/224335237361"
        }, 
       {
            date: "2026-07-02",
            title: "8회차 - 파이썬 CSV와 클래스",
            summary: "파이썬으로 데이터를 파일에 저장하고 읽어오는 CSV 파일 입출력 기능과, 프로그램을 구조적으로 만들 수 있는 클래스 개념을 학습했습니다. 외부 데이터를 프로그램으로 가져와 다루는 방법부터, 코드의 재사용성을 높여주는 객체지향 프로그래밍의 기초까지 배우며 실무 프로그램 개발을 위한 데이터 처리와 설계의 기본 원리를 다뤘습니다.",
            tags: ["Python"],
            link: "https://blog.naver.com/10soong/224334387816"
        }, 
       {
            date: "2026-07-01",
            title: "7회차 - 파이썬 파일입출력과 예외처리",
            summary: "파이썬의 외부 데이터 연동과 프로그램 안정성의 핵심인 파일 입출력 및 예외 처리를 학습하여, 텍스트 데이터의 영속적 저장부터 실행 중 발생할 수 있는 잠재적 오류의 체계적 제어까지, 실무형 프로그램 개발과 견고한 소프트웨어 설계의 토대가 되는 데이터 핸들링 및 예외 관리 메커니즘의 동작 원리와 활용법을 다뤘습니다.",
            tags: ["Python"],
            link: "https://blog.naver.com/10soong/224333259736"
        }, 
       {
            date: "2026-06-30",
            title: "6회차 - 파이썬 람다와 Import",
            summary: "익명 함수(lambda)와 고차 함수(map, filter)를 활용해 복잡한 반복문 없이 데이터를 효율적으로 정제하는 기법을 배웠습니다. 이에 더해 import를 통한 모듈화 구조를 습득하면서, 복잡한 로직을 재사용 가능한 독립적 단위로 쪼개고 관리하는 개발의 효율성을 체감할 수 있었습니다.",
            tags: ["Python"],
            link: "https://blog.naver.com/10soong/224332026333"
        }, 
       {
            date: "2026-06-29",
            title: "5회차 - 파이썬 함수선언",
            summary: "다양한 자료구조 내 데이터의 효율적인 순회 기법(for in)과 코드 축약형 제어문(리스트 내포)을 통해 파이썬 고유의 최적화된 데이터 처리 방식을 이해하고, 반복적인 로직을 재사용 가능한 단위로 구조화하는 함수 지향적 설계 능력을 배양했습니다",
            tags: ["Python"],
            link: "https://blog.naver.com/10soong/224330851876"
        }, 
       {
            date: "2026-06-26",
            title: "4회차 - 파이썬 반복문",
            summary: "파이썬의 핵심 제어 흐름인 while문과 for문을 학습하여 조건 기반 반복부터 시퀀스 순회까지, 자동화와 알고리즘 구현의 토대가 되는 루프 구조의 동작 원리와 활용법을 다뤘습니다.",
            tags: ["Python"],
            link: "https://blog.naver.com/10soong/224328241497"
        }, 
       {
            date: "2026-06-25",
            title: "3회차 - 파이썬 제어문",
            summary: "기초 자료구조에 대한 이해와 if-elif 제어문을 통한 논리적 흐름 설계를 바탕으로, 업무 자동화 스크립트의 뼈대가 되는 데이터 입출력 제어, 형변환, 연산자 메커니즘 및 심화 문자열 처리 기술을 체계적으로 정리했습니다.",
            tags: ["Python"],
            link: "https://blog.naver.com/10soong/224327194820"
        },     
       {
            date: "2026-06-24",
            title: "2회차 - 파이썬 집합자료형",
            summary: "파이썬의 기초 서식과 문자열, 리스트, 튜플에 대한 이해를 바탕으로, 프로그래밍 프로토타이핑과 업무 자동화 스크립트의 뼈대가 되는 데이터 입출력 제어, 형변환(Type Casting), 연산자 메커니즘 및 심화 문자열 처리 기술을 체계적으로 정리했습니다.",
            tags: ["Python"],
            link: "https://blog.naver.com/10soong/224326086514"
        },
        {
            date: "2026-06-23",
            title: "1회차 - 파이썬 기초",
            summary: "프로그래밍 프로토타이핑과 자동화 스크립트의 기본이 되는 데이터 입출력 제어, 형변환(Type Casting), 연산자 메커니즘 및 문자열 처리 기초를 정리했습니다.",
            tags: ["Python"],
            link: "https://blog.naver.com/10soong/224324868806"
        }
    ],
    album: [
        { id: "img-01", src: "image/1.jpg", title: "[취미활동]", comment: "25년 8월 홍대에서 일렉기타 포지션으로 공연" },
        { id: "img-02", src: "image/2.jpg", title: "[취미활동]", comment: "26년 2월 홍대에서 일렉기타 포지션으로 공연" },
        { id: "img-03", src: "image/3.jpg", title: "[취미활동]", comment: "26년 2월 공연후 단체사진" },
        { id: "img-04", src: "image/4.jpg", title: "[여가활동]", comment: "해외여행 : 몽골" },
        { id: "img-05", src: "image/5.jpg", title: "[여가활동]", comment: "전시회 : 아르떼뮤지엄" },
        { id: "img-06", src: "image/6.jpg", title: "[교내활동]", comment: "학생회 임원으로서 체육대회 기획 및 운영 마무리 후 단체사진" },
        { id: "img-07", src: "image/7.jpg", title: "[Learn & Run]", comment: "박찬권 저자의 오라클 SQL 파워업 출간 전 베타테스트 및 스터디 " },
        { id: "img-08", src: "image/8.jpg", title: "[Learn & Run]", comment: "지인들로 팀을 만들어 개발프로젝트 진행" },
        { id: "img-09", src: "image/9.jpg", title: "[Learn & Run]", comment: "스터디와 밸런스를 맞추며 에너지를 발산하는 풋살" }
    ]
};
