# TreatmentRecordFrontend
このアプリは畜産農家における牛の個体管理と治療管理を行うためのアプリです。
フロントエンドはReact、バックエンドはRuby on RailsのAPIモードで動作しています。
このリポジトリはフロントエンド部分です。バックエンドは [treatment_record_backend](https://github.com/DeargGlen/treatment_record_backend) を参照してください。

このプロジェクトはcreate-react-appで作成しました。
## 使用技術
- Node v16.15.0
- yarn 1.222.18
- npm 8.5.5
- React 18.1.0
- AWS
  - Amplify

## 機能
- 牛の個体の管理(登録、一覧表示、詳細表示)
- 牛の治療管理(登録、一覧表示、詳細表示)
- 牛群移動(牛舎間で牛を一括で移動する機能)
- その他設定(牛舎の設定、牛のタグ、治療のタグの設定など)

デプロイ先：https://main.d2pa0coi8lb5d7.amplifyapp.com/
※現状では個人での使用を想定しており、既存のユーザーのみが新規のユーザー登録をできるようにしています。
## インストール方法

git clone するか、zipファイルを直接ダウンロードしてください。
```bash
$ git clone https://github.com/DeargGlen/treatment_record_frontend.git
```
以下で必要なパッケージをインストールします。
```bash
$ yarn install
```
src/client.tsで必要な環境変数を.envなどで用意してください。

以下のコマンドで開発環境でアプリケーションを起動します。
```bash
$ yarn start
```
開発環境では、バックエンドをlocalhost:3000, フロントエンドをlocalhost:3001で起動しています。
以下のコマンドでアプリケーションをビルドします。
```bash
$ yarn build
```

