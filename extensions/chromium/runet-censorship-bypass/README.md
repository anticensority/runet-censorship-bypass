# Install

Nodejs 10 and gulp have [issues](https://github.com/nodejs/node/issues/20285),
use nodejs 8 instead for a while.

```
npm install
cd src/extension-common/pages/options/
npm install
cd -
npm start
use your build/extension-beta
```

# Release

1. `vim src/extension-common/pages/options/src/components/App.js`
2. Change github link there.
3. `npm run release`
4. Change `App.js` back to original: `git checkout src/extension-common/pages/options/src/components/App.js`
5. `vim src/templates-data.js` and bump version.
6. Commit bumped version.
7. Merge development to production (usually after deployment and testing and many patches).
