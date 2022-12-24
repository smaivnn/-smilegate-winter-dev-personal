# User 관리 대시보드

>## 개요
1인 프로젝트(인증 시스템)기반의 admin대시보드
   
>## 기능
- user 목록 조회
- user 역할 변경
- user 탈퇴 처리
   
>## 기술스택
### client
- react
### server
- node.js
- express
- mongoDB
   
>## 프로세스
- 로그인시 accessToken 발급
- admin기능 사용 시 토큰 유효성 검증
- 유효하지 않은 토큰시 refreshToken을 통한 accessToken 갱신

![logicDiagram](https://user-images.githubusercontent.com/85821828/209441253-3c63ba29-9948-4b6c-af2c-be03c2343445.png)

   
>## 주요 구현
### clinet side
1. axios interceptor를 통한 토큰 포함 및 유효성 여부 검사 hooks
```
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const [accessToken, setAccessToken] = useState(
    userStore((state) => state.accessToken)
  );

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        // token expired
        const prevRequest = error?.config;
        if (error?.response?.status === 406 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          console.log("newAccessToken", newAccessToken);
          setAccessToken(newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
};
```

2. refreshToken을 통한 accessToken 재발급 hooks
```
const useRefreshToken = () => {
  const { setAccessToken } = userStore();

  const refresh = async () => {
    const response = await axios.get("/api/user/refresh", {
      withCredentials: true, // req에 쿠키를 보내는걸 allow해줌.
    });
    if (response.data.success) {
      setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    }
  };
  return refresh;
};
```

### server side
1. accessToken 포함 여부 검증 및 decode 미들웨어
```const jwt = require("jsonwebtoken");

const verifyJwtToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(405);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(406); //invalid token
    req.roles = decoded.roles;
    req._id = decoded._Id;
    next();
  });
};


module.exports = verifyJwtToken;
```
2. 역할 검증 미들웨어
```const roles_list = require("../config/roles_list");

const verifyRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(407);

    const result =
      req.roles[allowedRoles] === roles_list[allowedRoles] ? true : false;
    if (!result) return res.sendStatus(408);

    next();
  };
};

module.exports = verifyRoles;
```
   
>## 프로젝트 진행 중 문제점

### 1. client측 동작 고려 미흡
서버를 구상할 때 client측의 동작을 충분히 고려한 후 진행하여야 하는데, 
이를 고려하지 않고 서버를 우선 구현한 후 client의 기능을 서버에 맞추는 방식으로 진행이 되었다.
   
이는 추후 서버측 코드의 수정, response 형식의 변환 등 다양한 문제 상황이 발생하였다. 
결국 이는 목표에서 지향했던 설계에 기반한 깔끔한 코드에 부합하지 않는 방식으로 진행되었다.
   
### 2.  client측 pagination 방식 설계 미흡
2-1) 현재 잘 동작은 하나 page계산이 굉장히 복잡하다. 성능 설계서 작성 이후 구현하도록 추후 변경.
2-2) 주소에서 바로 진입하는 유저를 위한 쿼리스트링을 통한 변수를 지정하고자 하였는데 구현에 첨가되지 못하였다.
추후 이 부분 반영하도록 수정할 것.
   
### 3. client측 admin페이지 role 변경시 페이지 리로딩
react는 기본적으로 페이지 새로고침을 권장하지 않는다.
role이 변경되었을 때 페이지 리로드 없이 해당하는 컴포넌트만 변경이 되도록 구현하는 것이 좋은 방식이 아닐까 생각하였다.
   
### 4. zustand를 통한 accessToken의 전역관리
accessToken은 주로 로컬 변수로 관리하며 노출되지 않도록 한다.
하지만 현재 zustand를 통한 전역변수에 담겨있고, 이를 persist시키는 과정에서 storage에 토큰이 노출되는 현상이 있다.
이러한 부분을 context를 사용한 로컬 변수로 전환하는 과정이 필요하다.
   
>## 작동 화면
메인 페이지   
<img width="600" alt="매인" src="https://user-images.githubusercontent.com/85821828/209441518-f0d11adc-6e6e-42e0-bb40-21c38654dedd.png">   
로그인 페이지   
<img width="600" alt="로그인" src="https://user-images.githubusercontent.com/85821828/209441526-1696be50-bd80-4d9a-b023-22a97dbab01d.png">   
회원가입 페이지   
<img width="600" alt="회원가입" src="https://user-images.githubusercontent.com/85821828/209441533-a1d09117-e793-46dd-9bf7-6c8dabe1c488.png">   
로그인 이후   
<img width="600" alt="로그인이후" src="https://user-images.githubusercontent.com/85821828/209441539-b65f2768-2c05-45ed-b743-1a8ed44bf9db.png">   
관리자 페이지 진입(토큰 변경됨)   
<img width="600" alt="관리자페이지진입" src="https://user-images.githubusercontent.com/85821828/209441543-5853f534-f057-43ff-a2fd-c9785d8b1d59.png">

