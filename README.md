## How to run

1. Clone repository

   ```bash
   git clone https://github.com/ridho-dinarto/crypto-tracker.git
   ```

1. Go to folder, and copy `env-example-relational` as `.env`.

   ```bash
   cd crypto-tracker/
   cp env-example-relational .env
   ```

1. Run containers

   ```bash
   docker compose up -d
   ```

1. For check status run

   ```bash
   docker compose logs
   ```

1. Open <http://localhost:3000/docs> for Swagger Documentation

---
