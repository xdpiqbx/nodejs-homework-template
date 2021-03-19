# Homework 006 [Email verification] - Done

## Added packages

[@babel/core](https://www.npmjs.com/package/@babel/core) - Babel compiler core.

```text
npm i @babel/core -DE
```

[@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser) - allows to lint ALL valid Babel code with the fantastic ESLint.

```text
npm i @babel/eslint-parser -DE
```

[@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) - Below is a class with four class properties which will be transformed.

```text
npm i @babel/plugin-proposal-class-properties -DE
```

[@babel/plugin-proposal-private-methods](https://babeljs.io/docs/en/babel-plugin-proposal-private-methods)

```text
npm i @babel/plugin-proposal-private-methods -DE
```

---

[Sendgrid](https://www.npmjs.com/package/@sendgrid/mail) - is a dedicated service for interaction with the mail endpoint of the SendGrid v3 API.

```text
npm i @sendgrid/mail
```

[Sendgrid](https://sendgrid.com/) - email service

---

[Mailgen](https://www.npmjs.com/package/mailgen) - a Node.js package that generates clean, responsive HTML e-mails for sending transactional mail.

```text
npm i mailgen
```

---

## Added files

- babel.config.json - ["@babel/plugin-proposal-class-properties", "@babel/plugin-proposal-private-methods"]
- configs/config.json - define configs for future
- service/email.js - generate email template and send it for verification

---

## Edited files

- .eslintrc.js - added @babel/eslint-parser
- controllers/authUserController.js - transfered part logic from model/authModel.js
- model/schemas/schUser.js - added properties verify and verifyToken
- model/authModel.js - change model, part of logic transfered to authUserController
- model/userModel.js - added new functions "findByVerifyToken" and "updateVeryfiToken", function "createUser" get parameters - verify and verifyToken
- routes/api/auth.js - added route '/verify/:token'

---
