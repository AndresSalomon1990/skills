# NestJS architecture

Respect Nest's module system — do not flatten into a custom layout.

## Standard layout

```text
src/
  main.ts
  app.module.ts
  {domain}/
    {domain}.module.ts
    {domain}.controller.ts
    {domain}.service.ts
    dto/
      create-{entity}.dto.ts
      update-{entity}.dto.ts
      {entity}-response.dto.ts
      index.ts
    interfaces/          # optional
  database/
    entities/
    migrations/
  common/              # guards, filters, interceptors, pipes
test/
  *.e2e-spec.ts
```

## Conventions

- One module per bounded context
- DTOs with validation (`class-validator` or Zod — stay consistent within the project)
- OpenAPI/Swagger when the API is documented
- E2E tests in `test/` with dedicated tsconfig
- Unit tests: colocated `*.spec.ts` next to services/controllers (Nest default) — see [testing.md](testing.md)
- Config via `@nestjs/config` — `.env.example` committed, `.env` gitignored

## AGENTS.md highlights

Document auth strategy, database/migration commands, and external integrations at a high level — no credentials.

## Ecosystem skills (after standardization)

No official NestJS skills on skills.sh — community options (`nestjs-best-practices`, `expressjs-rest-api` for Express-style boundaries) are listed in [complementary-practices.md](complementary-practices.md).
