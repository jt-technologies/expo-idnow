#!/bin/sh

# Fetch the latest release information from GitHub API
# Extract the download URL using jq
DOWNLOAD_URL=$(curl -s https://api.github.com/repos/idnow/de.idnow.ios.sdk.spm/releases/latest | jq -r '.zipball_url')

if [ -z "$DOWNLOAD_URL" ]; then
    printf "Failed to fetch download URL. Exiting ...\n"
    exit 1
fi

# Create or clean the temporary directory
TARGET_DIR="./tmp"
if [ -d "$TARGET_DIR" ]; then
    rm -rf "$TARGET_DIR"/*
else
    mkdir -p "$TARGET_DIR"
fi

# Download the latest release zip file
printf "Downloading IDnow SDK Framework from $DOWNLOAD_URL ...\n"
curl -L "$DOWNLOAD_URL" -o "$TARGET_DIR/idnow-sdk-latest.zip"
printf "Downloaded to: $TARGET_DIR/idnow-sdk-latest.zip\n"

printf "..........\n"

# Extract the zip file
printf "Extracting IDnow SDK Frameworks to $TARGET_DIR/idnow-sdk ...\n"
unzip -q "$TARGET_DIR/idnow-sdk-latest.zip" -d "$TARGET_DIR/idnow-sdk"

# Find the extracted directory (it will have a dynamic name)
EXTRACTED_DIR=$(find "$TARGET_DIR/idnow-sdk" -mindepth 1 -maxdepth 1 -type d)
printf "Extracted into: $EXTRACTED_DIR\n"

printf "..........\n"

# Create or clean the target frameworks directory
FRAMEWORKS_DIR="./ios/Frameworks"
if [ -d "$FRAMEWORKS_DIR" ]; then
    rm -rf "$FRAMEWORKS_DIR"/*
else
    mkdir -p "$FRAMEWORKS_DIR"
fi

# Copy the specified frameworks to the desired locations
printf "Copying IDnow SDK Frameworks to $FRAMEWORKS_DIR ...\n"
cp -R "$EXTRACTED_DIR/Frameworks/FaceTecSDK.xcframework" "$FRAMEWORKS_DIR/FaceTecSDK.xcframework"
cp -R "$EXTRACTED_DIR/Frameworks/IDNowSDKCore-without-NFC.xcframework" "$FRAMEWORKS_DIR/IDNowSDKCore.xcframework"
printf "IDnow SDK Frameworks copied successfully.\n"

printf "..........\n"

# Clean up
rm -rf "$TARGET_DIR"

printf "IDnow SDK Frameworks downloaded and copied Successfully!!!\n"
