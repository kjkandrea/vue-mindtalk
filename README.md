# MindTalk

## 프로젝트 소개
> MindTalk 은 현재 호스팅 되고 있습니다. [mindtalk.shoplic.store](https://mindtalk.shoplic.store/)

이것은 Vue 프레임워크와 Wordpress REST API의 연동을 학습해보기 위한 토이 프로젝트입니다.
Vue를 통해 모든 기능이 동작하며, Wordpress는 로고, 메뉴, 콘텐츠 등을 관리하는 CMS로 활용합니다.
Wordpress REST API가 궁금하시다면, [REST API Handbook](https://developer.wordpress.org/rest-api/) 을 살펴보세요.

## 프로젝트 목표
MindTalk은 유저가 즐겁게 이용할 수 있는 SPA 심리테스트 어플리케이션을 목표로 합니다.
콘텐츠매니저가 사이트콘텐츠를(주로 심리테스트 문제) Wordpress 대시보드에서 등록하는것을 목표로 합니다.

### 웹 어플리케이션
* 홈 페이지에서 퀴즈 콘텐츠 목록 구현
* 퀴즈 페이지에서 퀴즈 풀기 구현
* 퀴즈 페이지에서 연관 콘텐츠로 이동할 수 있는 목록 제공

### 심리테스트
* '문제 점수 합산'에 대한 결과
* '가장 많이 선택된 값'에 대한 결과
* 결과가 복수일 수 있으며, 복수일 경우 해당하는 모든 결과를 표시함

### With Wordpress
* Wordpress 로고 관리 연동
* Wordpress 메뉴 관리 연동
* Wordpress Page 연동
 * Wordpress Post 연동
 * Wordpress Quiz Custom Post 연동

## 개발 방식
Vue 프레임워크 만을 사용하여 개발하고 필요한 기능에 대해서만 라이브러리를 추가하는 방식으로 진행하였습니다.
대략 다음과 같은 라이브러리를 추가하였습니다.
* **vue-router** : SPA 라우팅
* **vue-infinite-loading** : 인피니트 스크롤 구현
* **axios** : ajax 요청

아직 Vue개발이 익숙하지 않은 만큼 Nuxt, Vuetify를 사용하는것을 의도적으로 지양하였습니다. 
  
  