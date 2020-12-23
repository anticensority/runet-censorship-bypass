# Install

Tested on:

NodeJS: v14.13.1.
NPM: 6.14.8.
OS: Linux Mint 20 Xfce Edition.

```
npm install
cd src/extension-common/pages/options/
npm install
cd -

# For debugging:
npm start
# Use your build/extension-beta

# For production:
npm start
# Use your build/extension-full or build/extension-mini
```

# For Reviewers

Steps to reproduce the same zip:
```
npm ci
cd src/extension-common/pages/options/
npm ci
cd -
npm start
# See ./build/extension-full
cd ./build/extension-full
zip -r runet-censorship-bypass-full.zip ./*
```

# Release Instructions

1. `npm run release`
2. `vim src/templates-data.js` and bump version.
3. Commit bumped version.
4. Merge development to production (usually after deployment and testing and many patches).
