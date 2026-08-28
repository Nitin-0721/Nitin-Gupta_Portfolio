/**
 * Utility to verify if a configuration link or profile property is still a placeholder.
 */
export const isPlaceholder = (value) => {
  if (!value) return true;
  const upper = value.trim().toUpperCase();
  return (
    upper === 'GITHUB_URL' ||
    upper === 'LINKEDIN_URL' ||
    upper === 'LEETCODE_URL' ||
    upper === 'CODECHEF_URL' ||
    upper === 'EMAIL' ||
    upper === 'RESUME_URL' ||
    upper === 'LOCATION' ||
    upper === 'SHORT_BIO' ||
    value === '#'
  );
};
