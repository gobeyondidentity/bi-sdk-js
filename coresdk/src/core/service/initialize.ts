import { Configuration } from "../../configuration";
import { Core } from "../core";
import { Host } from "../../host";
import { kmc_migrate_database } from "kmc-ffi";

export async function initialize(config: Configuration): Promise<Core> {
  let host = new Host(config);
  let core = new Core(host);
  await migrateDatabase(config.allowedDomains);

  // Get the appInstanceID. This is the step that populates the
  // appInstanceId on first run.
  await core.getAppInstanceId();
  return core;
}

/**
 * Global one-time-call flag for kmc-migrate-database.
 * (It's a promise.)
 */
let __migrate_db: Promise<any> | undefined = undefined;

/**
 * one-time-call for kmc-migrate-database.
 * This function exists because in the WebAuthenticator,
 * reactJS in development mode, will initialize core
 * twice, which will induce a panic in kmc_migrate_database.
 * @param allowedDomains
 */
async function migrateDatabase(allowedDomains?: string) {
  if (__migrate_db === undefined) {
    __migrate_db = kmc_migrate_database(allowedDomains);
  }
  return __migrate_db;
}
