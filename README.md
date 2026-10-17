# 모서리 스캐너

문서 사진의 네 모서리를 자동으로 찾아 반듯하게 펴고, 보정 필터를 거쳐 A4 PDF로 저장하는 웹앱입니다.
모든 처리는 기기 안에서 이뤄지며 사진은 어디에도 업로드되지 않습니다.

## 파일 구성

```
index.html              앱 전체 (HTML·CSS·JS 한 파일)
manifest.webmanifest    홈 화면 설치 정보 (이름, 아이콘, 색)
sw.js                   오프라인 캐시 (service worker)
icons/                  앱 아이콘
```

## GitHub Pages에 올리기 (git 없이 웹에서)

1. GitHub에 로그인 → 오른쪽 위 **+** → **New repository**
   - Repository name: 예) `scanner`
   - **Public** 선택 (무료 계정은 Public이어야 Pages 사용 가능) → **Create repository**
2. 새 저장소 화면에서 **uploading an existing file** 클릭
   → 압축을 푼 폴더 **안의 파일과 icons 폴더**를 통째로 끌어다 놓기 → **Commit changes**
   - `index.html`이 저장소 맨 위(루트)에 있어야 합니다.
3. 저장소 **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/(root)** → **Save**
4. 1~2분 뒤 `https://<GitHub아이디>.github.io/scanner/` 에서 열립니다.

## 휴대폰에 앱처럼 설치

- **iPhone (Safari)**: 주소 열기 → 공유 버튼 → **홈 화면에 추가**
- **Android (Chrome)**: 주소 열기 → ⋮ 메뉴 → **앱 설치** 또는 **홈 화면에 추가**

한 번 열고 나면 인터넷이 없어도 실행됩니다.

## 저장 방식

- **PDF 저장 / JPG 저장**: 기기의 다운로드 폴더(iPhone은 미리보기 → 공유 → "파일에 저장")
- **공유** 버튼: 파일 공유를 지원하는 휴대폰에서만 보입니다. 카카오톡·메일·파일 앱으로 바로 보낼 수 있습니다.
- 파일 이름: `scan_2026-10-17_1428.pdf` 형식

## 수정 후 다시 올릴 때

`index.html`을 고쳐서 다시 업로드했다면 `sw.js` 맨 위의 `VERSION = 'v1'`을 `'v2'`처럼 올려서 함께 업로드하세요.
그래야 이미 설치된 휴대폰에서도 새 버전으로 바뀝니다. (앱을 한 번 열었다 닫으면 반영)

## 참고

- 카메라 사진 입력은 HTTPS 주소에서만 안정적으로 동작합니다. GitHub Pages는 기본이 HTTPS라 문제없습니다.
- 흰 종이를 밝은 책상에서 찍으면 모서리 인식이 약할 수 있습니다. 어두운 바닥 위에서 찍는 것이 가장 정확합니다.
