#!/bin/bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" || exit ; pwd -P )
cd "$parent_path" || exit

PACKAGE_JSON_PATH="../package.json"

PACKAGE_NAME=$(grep -Eo '@beyondidentity/bi-sdk-js(-\w+)?"' $PACKAGE_JSON_PATH | sed 's/"//g')
PACKAGE_VERSION=$(grep -Eo "$PACKAGE_NAME\"[[:space:]]*:[[:space:]]*\"[^\"]+\"" $PACKAGE_JSON_PATH | sed -n 's/.*: "\(.*\)"/\1/p')

echo "Package name: $PACKAGE_NAME"
echo "Package version: $PACKAGE_VERSION"

# Check if we have a package name and version
if [[ -z $PACKAGE_NAME || -z $PACKAGE_VERSION ]]; then
  echo "Could not find the package in $PACKAGE_JSON_PATH."
  exit 1
fi

echo "Checking for package $PACKAGE_NAME ($PACKAGE_VERSION) on npm..."

TIMEOUT=300  # 5 minutes in seconds
INTERVAL=10  # Check every 10 seconds

ELAPSED=0

while [[ $ELAPSED -lt $TIMEOUT ]]; do
  if npm info "$PACKAGE_NAME@$PACKAGE_VERSION" > /dev/null 2>&1; then
    echo "Success! Package $PACKAGE_NAME ($PACKAGE_VERSION) has been uploaded to npm!"
    exit 0
  else
    echo "Still waiting for package $PACKAGE_NAME ($PACKAGE_VERSION)..."
  fi

  # Wait for the specified interval
  sleep $INTERVAL
  ELAPSED=$((ELAPSED + INTERVAL))
done

echo "Failed to find package $PACKAGE_NAME ($PACKAGE_VERSION) on npm within 5 minutes."
exit 1
