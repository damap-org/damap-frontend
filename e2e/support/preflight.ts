const backendHealthUrl = 'http://localhost:8080/q/health/live';
const backendConfigUrl = 'http://localhost:8080/api/config';
const keycloakDiscoveryUrl = 'http://localhost:8087/realms/damap/.well-known/openid-configuration';

const prerequisiteMessage = `DAMAP e2e requires the local backend dependencies before Playwright starts.

Start Keycloak on http://localhost:8087 and the Quarkus dev backend on http://localhost:8080, then rerun the e2e command.`;

async function checkEndpoint(name: string, url: string): Promise<void> {
  let response: Response;

  try {
    response = await fetch(url, { signal: AbortSignal.timeout(5_000) });
  } catch (error: unknown) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`${prerequisiteMessage}

${name} is not reachable at ${url}.
${detail}`);
  }

  if (!response.ok) {
    throw new Error(`${prerequisiteMessage}

${name} responded with HTTP ${response.status} at ${url}.`);
  }
}

async function checkBackendConfig(): Promise<void> {
  let response: Response;

  try {
    response = await fetch(backendConfigUrl, { signal: AbortSignal.timeout(5_000) });
  } catch (error: unknown) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`${prerequisiteMessage}

DAMAP backend config is not reachable at ${backendConfigUrl}.
The frontend cannot start authentication until this endpoint works.
${detail}`);
  }

  if (!response.ok) {
    throw new Error(`${prerequisiteMessage}

DAMAP backend config responded with HTTP ${response.status} at ${backendConfigUrl}.
The Quarkus health endpoint may be live while application config is still broken, often because database startup or schema validation failed.`);
  }

  const config = (await response.json()) as {
    readonly issuer?: unknown;
    readonly clientID?: unknown;
    readonly responseType?: unknown;
    readonly scope?: unknown;
  };

  if (
    typeof config.issuer !== 'string' ||
    typeof config.clientID !== 'string' ||
    typeof config.responseType !== 'string' ||
    typeof config.scope !== 'string'
  ) {
    throw new Error(`${prerequisiteMessage}

DAMAP backend config at ${backendConfigUrl} is missing OAuth fields required by the frontend.`);
  }
}

export async function verifyBackendPrerequisites(): Promise<void> {
  await Promise.all([
    checkEndpoint('DAMAP backend health check', backendHealthUrl),
    checkBackendConfig(),
    checkEndpoint('Keycloak discovery document', keycloakDiscoveryUrl),
  ]);
}
