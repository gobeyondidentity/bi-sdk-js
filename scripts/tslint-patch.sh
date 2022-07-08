#!/bin/bash
set -e

# Add ts-lint directives to prevent linters from trying to resolve coresdk.
{ echo "// @ts-ignore"; cat dist/src/index.d.ts; } > /tmp/file.$$ && mv /tmp/file.$$ dist/src/index.d.ts
{ echo "// @ts-ignore"; cat dist/src/embedded.d.ts; } > /tmp/file.$$ && mv /tmp/file.$$ dist/src/embedded.d.ts
