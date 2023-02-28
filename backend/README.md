# JOB BOARD API

API for the project Job Board at Epitech Strasbourg.

## Requirements

- [Node.js](https://nodejs.org/) (> v14.20.1)
- [MySQL](https://www.mysql.com/)
- [Postman](https://www.postman.com/) (Optional)

## Install

```bash
git clone https://github.com/EpitechMscProPromo2025/T-WEB-501-STG-5-1-jobboard-nathan.blind-heitz/
cd "T-WEB-501-STG-5-1-jobboard-nathan.blind-heitz/backend"
npm install
```

## Database MySQL
_You can find all table creations and inserts in the file [db.sql](db.sql)._

```bash
mysql [-h localhost] -u <user> -p<password>
source db.sql
```

## Configure app

Create and open `.env` file in the project directory then edit it with your settings. Use this template:

```properties
DATABASE_URL="mysql://<user>:<password>@localhost:3306/<database>"
APP_PORT=3000
JWT_SECRET=<secret>
LOAD_FIXTURES=true #optional
```

## Running the project

```bash
npm start
```

## Documentation (Swagger)
The documentation can be find directly in the API using `/api-docs` URL path.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more informations.