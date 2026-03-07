module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          { type: 'build', release: 'patch' },
          { type: 'build', scope: 'patch', release: 'patch' },
          { type: 'build', scope: 'minor', release: 'minor' },
          { type: 'build', scope: 'major', release: 'major' },
          { type: 'feat', release: 'minor' },
          { type: 'feat', scope: 'minor', release: 'minor' },
          { type: 'feat', scope: 'major', release: 'major' },
          { type: 'fix', release: 'patch' },
          { type: 'fix', scope: 'patch', release: 'patch' },
          { type: 'fix', scope: 'minor', release: 'minor' },
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogTitle: '# Changelog',
      },
    ],
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
};
