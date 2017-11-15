# Contributing

If you've found an issue, or are proposing a new feature, why not issue a PR with the fix / proposal!? If you don't have time for that, issues are always welcome.

## Installing

We just use NPM.

```sh
npm install
```

## Testing

We use Jest for running our tests. All tests should be located in a `__tests__` directory *next* to the files they're testing.

To run the tests:

```sh
jest
```

## Releasing

Only certain people can release but this is the process:

1. `npm version [typeOrVersion]`
2. `npm publish`
3. `git push --follow-tags`

## Checking bundle size

We place a heavy emphasis on bundle size and strive to keep it below 1k. To check on the bundle size, just run:

```sh
npm run size
```
