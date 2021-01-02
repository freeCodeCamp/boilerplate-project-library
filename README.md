# [Personal Library](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/personal-library)

## セットアップ＆起動

- Try to use npx to run installed package locally.

```bash
akiko@mb boilerplate-project-library % npm -v
6.5.0

> fcc-library@1.0.0 start boilerplate-project-library
> node server.js

Listening on port undefined

```

## テストの実行

環境変数``NODE_ENV=test`` に設定します。
npm run startのタイミングでテストも実行されます。

```bash
% export NODE_ENV=test
% npm run start

> fcc-library@1.0.0 start boilerplate-project-library
> node server.js

Listening on port undefined
Running Tests...


  Functional Tests
    1) #example Test GET /api/books
    Routing tests
      POST /api/books with title => create book object/expect book object
        2) Test POST /api/books with title
        3) Test POST /api/books with no title given
      GET /api/books => array of books
        4) Test GET /api/books
        ....
```
