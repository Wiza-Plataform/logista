// ENG-031: feat(orders): reserva de stock no checkout [S06 LJ-021 MT-01]
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'test', 'docs', 'chore', 'perf', 'ci']],
    'scope-empty': [2, 'never'],
    'subject-case': [0],
  },
};
