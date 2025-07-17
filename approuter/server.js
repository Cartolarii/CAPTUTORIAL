const path = require('path');
const fs   = require('fs');

// ─── 1. lê o JSON completo ──────────────────────────────────────────
const envFile = path.join(__dirname, 'default-env.json');
const env     = JSON.parse(fs.readFileSync(envFile, 'utf8'));

// ─── 2. injeta diretamente no process.env ───────────────────────────
process.env.VCAP_SERVICES = JSON.stringify(env.VCAP_SERVICES);
process.env.destinations  = JSON.stringify(env.destinations); // ← ATTENTION: maiúsculo/minúsculo não importa

console.log('>> xsappname carregado =',
  env.VCAP_SERVICES.xsuaa[0].credentials.xsappname);

// ─── 3. inicia o Approuter ──────────────────────────────────────────
require('@sap/approuter')().start();  // porta 5000 por default
