import { mkdirSync, writeFileSync } from "node:fs";

const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
};

const VAULT_ADDR = required("VAULT_ADDR");

const login = await fetch(`${VAULT_ADDR}/v1/auth/approle/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    role_id: required("ROLE_ID"),
    secret_id: required("SECRET_ID"),
  }),
});
if (!login.ok) throw new Error(`approle login failed: HTTP ${login.status}`);
const token = (await login.json()).auth.client_token;

const read = await fetch(`${VAULT_ADDR}/v1/secret/data/pollpear/app`, {
  headers: { "X-Vault-Token": token },
});
if (!read.ok) throw new Error(`read pollpear/app failed: HTTP ${read.status}`);
const { gateway_url } = (await read.json()).data.data;

mkdirSync("public", { recursive: true });
writeFileSync("public/config.json", JSON.stringify({ gateway_url }));
