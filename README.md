# Angular Template

Project to easily start an Angular project using the latest technologies.

- Latest Angular version
  - Server Side Rendering
- Angular Material
- Tailwind CSS

It also includes development tools to easy your workflow.

- TypeScript
- Jest
- Docker
  - VSCode DevContainer
- ESLint
- Prettier
- Husky
  - Lint-staged
  - Commitlint

## TL;DR

1. Bring the project to your local machine.

   ```bash
   pnpx tiged cristobalgvera/angular-template <PROJECT_NAME>
   ```

1. Copy the environment file.

   ```bash
   cp .env.example .env
   ```

1. Choose one of the following options and go to [http://localhost:4200](http://localhost:4200)

   - Run locally.

     ```bash
     pnpm install
     pnpm start
     ```

   - Run in Docker.

     ```bash
     docker compose up --build -d app
     ```

     You can modify your files and watch the changes in real time.
     Also, you can enter to `VSCode` and use the project inside a `DevContainer`.

### Build the project

> [!TIP]
> You can choose were or how deploy the project.
> The following use `Docker`.

Create a production-ready build.

```bash
docker compose -f compose.prod.yml up --build -d app
```
