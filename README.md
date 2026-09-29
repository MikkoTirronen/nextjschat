# Quietline chat frontend

A .NET 10 ASP.NET Core Razor Pages (`.cshtml`) frontend for a SignalR chat application. It uses ASP.NET Core Identity cookie authentication and SQLite for local development.

## Run locally

```powershell
dotnet restore
dotnet run
```

Open the URL printed by `dotnet run`. Anonymous users are redirected server-side to the built-in Identity login page.

- Register: `/Identity/Account/Register`
- Login: `/Identity/Account/Login`
- Chat: `/`

Account confirmation is disabled only in Development so the frontend can be previewed without an email service. Production requires confirmed accounts.

## Project structure

- `Pages/Index.cshtml` — chat markup
- `Pages/Index.cshtml.cs` — authenticated PageModel and preview data
- `Pages/Shared/_Layout.cshtml` — shared HTML document
- `wwwroot/app.css` — responsive styling
- `wwwroot/js/chat.js` — local preview interactions
- `Data/` — Identity user, EF Core context, migrations, and development database

Create or update the development database with:

```powershell
dotnet ef database update
```

## SignalR integration

The current composer is a browser-only preview. Add the official `@microsoft/signalr` browser client to `wwwroot` when the hub contract is ready, then replace the local send behavior in `wwwroot/js/chat.js`.

For a same-origin hub, the protected Identity cookie is sent during SignalR negotiation automatically. Protect the hub with `[Authorize]` and enforce conversation membership inside every hub method. The UI must never be treated as an authorization boundary.

## Production checklist

- Use HTTPS/WSS and a persistent ASP.NET Core Data Protection key ring.
- Use a production database and move its connection string to deployment configuration or a secret store.
- Apply migrations as a controlled deployment step.
- Configure a transactional email provider for account confirmation and recovery.
- Validate message length and conversation membership on the server.
- Avoid logging message bodies, authentication cookies, and tokens.
- Use a reviewed end-to-end encryption protocol if the server must not be able to read messages.
