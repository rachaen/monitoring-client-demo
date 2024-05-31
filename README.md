## 실행 방법

1. 이 리포지토리를 클론합니다.
2. 터미널로 리액트 프로젝트 폴더 위치에서 `npm install`로 필요한 의존성을 설치합니다. (node js 설치가 되어 있어야 합니다.)
3. `npm start` 명령어를 실행합니다.
4. 브라우저에서 주소창에 http://localhost:3000 을 입력해서 접속합니다.

```bash
   git clone https://github.com/rachaen/monitoring-client-demo.git
   cd ./monitoring-client-demo
   npm install
   npm start
```

## 서버 연결 설정 방법

1. `package.json` 파일의 proxy를 원하는 서버 주소로 설정합니다. `"proxy": "http://desired-server-address"`
2. 엔드포인트를 설정하기 위해 `App.js` 파일의 `connectToServer` 함수에서 `const socket = new SockJS('지정한 엔드포인트 주소')`를 설정합니다.
