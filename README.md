# PutPullMock
PutPullMockはワイヤーフレーム作成支援アプリケーションです。  
![ppmk](https://raw.githubusercontent.com/mt3hr/PutPullMock/main/devdocs/resources/screenshot.1672967496.png)

## ビルド、インストールなど

### セットアップ
```
npm i
```

### インストール
[ここ](https://github.com/mt3hr/PutPullMock/releases/)からppmk.exeをダウンロード  
もしくは自分でビルド (Go言語開発環境が必要)  
```
npm run build; cd src/app/; go install -ldflags="-H windowsgui";
```

### 起動
初回実行時は起動までに時間がかかります  
```
ppmk
```