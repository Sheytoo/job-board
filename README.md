# JOB BOARD PROJECT


Project Job Board at Epitech Strasbourg.

## Requirements

- [Node.js](https://nodejs.org/) (> v14.20.1)
- [MySQL](https://www.mysql.com/)
- [Postman](https://www.postman.com/) (Optional)

## Clone project

```bash
git clone https://github.com/Sheytoo/job-board
```

## Install API

```bash
cd "job-board/backend"
npm install
```

### Database MySQL
_You can find all table creations and inserts in the file [db.sql](Step%2008/backend/db.sql)._

```bash
mysql [-h localhost] -u <user> -p<password>
source db.sql
```

### Configure app

Create and open `.env` file in the project directory then edit it with your settings. Use this template:

```properties
DATABASE_URL="mysql://<user>:<password>@localhost:3306/<database>"
APP_PORT=3000
JWT_SECRET=<secret>
LOAD_FIXTURES=true #optional
```

### Running the project

```bash
npm start
```

### Documentation (Swagger)
The documentation can be find directly in the API using `/api-docs` URL path.

## Install Frontend

```bash
cd "job-board/frontend"
npm install
```

### Build

```bash
npm run build
```

### Running the project

```bash
npm start
```

## Account for testing
_A full dataset for testing is available with this account._

- Email: louis.kleiver@epitech.eu
- Password: 1234

---

## Authors

- [Nathan BLIND HEITZ](https://github.com/Sheytoo)
