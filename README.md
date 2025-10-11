# EverVow 모바일 청첩장 서비스

## 소개
EverVow는 결혼을 앞둔 예비부부와 가족을 위한 감각적인 모바일 청첩장 제작 서비스입니다. 누구나 쉽고 빠르게, 단 5분 만에 나만의 청첩장을 만들고 공유할 수 있습니다. 특별한 날을 더욱 특별하게, EverVow가 함께합니다.

## 주요 기능
- **간편한 입력**: 신랑/신부 정보, 예식 정보, 인사말, 가족 및 계좌 정보 등 필수 항목만 입력하면 자동으로 청첩장이 완성됩니다.
- **다양한 디자인 템플릿**: 모던, 클래식, 내추럴, 빈티지, 럭셔리, 오션 등 6가지 테마 제공. 원하는 스타일을 자유롭게 선택하세요.
- **실시간 미리보기**: 입력 즉시 모바일/PC에서 디자인을 확인할 수 있습니다.
- **모바일 최적화**: 모든 기기에서 완벽하게 보이는 반응형 UI.
- **링크 공유**: 카카오톡, 문자, SNS 등으로 간편하게 청첩장 링크를 전달할 수 있습니다.
- **참석 관리**: 실시간 RSVP 기능으로 하객 참석 여부를 손쉽게 관리.
- **개인정보 보호**: 입력된 모든 정보는 안전하게 관리됩니다.

## 사용 기술
- **Frontend**: Next.js, React, Tailwind CSS, PostCSS
- **Backend**: Spring Boot(Java), JPA, RESTful API
- **Database**: MySQL, SQL Schema & Migration
- **Cloud & Storage**: Supabase, Static File Hosting
- **기타**: TypeScript, ESLint, Prettier, GitHub Actions

## 프로젝트 구조
- `frontend/` : Next.js 기반 사용자 인터페이스, 모바일/PC 반응형
- `backend/` : Spring Boot 기반 API 서버, 데이터 관리
- `database/` : DB 스키마 및 마이그레이션
- `docs/` : 서비스 및 개발 문서

## 실제 프로젝트 폴더 구조 예시

```
EverVow.iml
EverVowImage.png
invitations_tables.sql
package.json
my-app/
  next-env.d.ts
  next.config.ts
  package.json
  postcss.config.mjs
  README.md
  tsconfig.json
  app/
    favicon.ico
    globals.css
    layout.tsx
    page.tsx
  public/
    file.svg
    globe.svg
    next.svg
    vercel.svg
    window.svg
src/
  components/
    CanvasEditor.tsx
  main/
    java/
      com/
        example/
          evervow/
            controller/
              InvitationController.java
            dto/
              InvitationDto.java
            entity/
              Invitation.java
            repository/
              InvitationRepository.java
            service/
              InvitationService.java
wedding-invite/
  package.json
  pom.xml
  README.md
  backend/
    api/
      DesignController.java
      DesignRepository.java
      InvitationApi.java
      InvitationController.java
      InvitationCreateDto.java
      InvitationRepository.java
      InvitationResponseDto.java
      RsvpController.java
      RsvpCreateDto.java
      RsvpResponseRepository.java
      UserController.java
      UserCreateDto.java
      UserRepository.java
    config/
      application.properties
    models/
      Design.java
      Invitation.java
      RsvpResponse.java
      User.java
    services/
      InvitationService.java
  database/
    schema.sql
    migrations/
  docs/
    README.md
  frontend/
    next-env.d.ts
    package.json
    postcss.config.js
    postcss.config.mjs
    tailwind.config.js
    tsconfig.json
    app/
      globals.css
      layout.tsx
    components/
      Button.js
      Card.js
      Header.js
      index.js
      Input.js
      ProgressBar.js
      SectionTitle.js
    pages/
      _app.js
      design.js
      form.js
      index.js
      invite/
        [id].js
      preview/
        [id].js
    public/
      EverVowImage.png
    utils/
      supabaseClient.js
  storage/
```

## 마케팅 포인트
- **무료 체험 & 회원가입 없이 바로 시작**: 누구나 부담 없이 청첩장 제작 가능
- **5분 내 완성**: 복잡한 과정 없이 빠르고 쉽게
- **감각적인 디자인**: 최신 트렌드 반영, 엠블럼 및 브랜드 아이덴티티 적용
- **실시간 미리보기 & 수정**: 원하는 대로 즉시 반영
- **모든 기기 완벽 지원**: 모바일, 태블릿, PC 어디서나 아름답게
- **안전한 정보 관리**: 개인정보 및 계좌 정보 암호화 저장

## 시작하기
1. [EverVow 홈페이지](https://evervow.com) 접속
2. '청첩장 만들기' 클릭 후 정보 입력
3. 디자인 선택 및 미리보기 확인
4. 완성된 청첩장 링크 공유

---

**EverVow와 함께, 당신의 소중한 순간을 더욱 특별하게 만드세요!**
