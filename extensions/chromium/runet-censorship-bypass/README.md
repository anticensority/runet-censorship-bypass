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

# Release Instructions

1. `npm run release`
2. `vim src/templates-data.js` and bump version.
3. Commit bumped version.
4. Merge development to production (usually after deployment and testing and many patches).
