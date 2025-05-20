## Description

- 테스트 편의를 위해 .env 노출 (로컬 테스트 정보)
- msa tcp rpc 방식으로 구현
- event(1) <- reward(n)
  - 한 이벤트에 여러 보상 조건이 있을 수 있다고 가정
- monorepo 지만 서로 다른 서버라 생각하고 tcp 통신
- 보상 요청 검증만 unit test

### 구조
```
apps
 ├── auth
 │    ├── auth
 │    └── user
 ├── event
 │    ├── event
 │    ├── event-reward-request
 ├── gateway
 │    ├── auth
 │    ├── event
 │    └── event_reward_request
libs
 └── common
```

### 테스트 시나리오
```
1. 관리자 생성 (ADMIN)
2. 유저 회원가입
  - OPERATOR, AUDITOR, USER
3. 관리자 로그인
4. 이벤트 생성
5. 보상 추가
  - 조건 종류
    - 복귀 유저
    - 출첵
    - 연속 출첵
    - 응모 (수동 검증 의도 isAuto = false)
6. 보상 요청 (유저 전용)
7. 보상 요청 내역 조회
```

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
$ docker-compose up -d --build
```

## gateway swagger
- http://localhost:3000/docs
