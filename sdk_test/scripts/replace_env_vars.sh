#!/bin/bash

# Check if both environment variables are set
if [[ -z "$BROWSERSTACK_USERNAME" ]] || [[ -z "$BROWSERSTACK_ACCESS_KEY" ]]; then
    echo "Either BROWSERSTACK_USERNAME or BROWSERSTACK_ACCESS_KEY is not set"
    exit 1
fi

# Input file name
INPUT_FILE="browserstack.yml"
# Temporary file for intermediate processing
TMP_FILE="temp.yml"

# Use sed to replace the placeholders with environment variables
sed "s/\${BROWSERSTACK_USERNAME}/$BROWSERSTACK_USERNAME/g" $INPUT_FILE | \
sed "s/\${BROWSERSTACK_ACCESS_KEY}/$BROWSERSTACK_ACCESS_KEY/g" > $TMP_FILE

# Move the temporary file to the original file
mv $TMP_FILE $INPUT_FILE
