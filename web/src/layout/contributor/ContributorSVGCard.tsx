
import { Contributor, ContributionKind } from '../../types';
import prettifyNumber from '../../utils/prettifyNumber';

interface ContributorSVGCardOptions {
  contributor: Contributor;
  width?: number;
  height?: number;
}

function getKindIcon(kind: ContributionKind, x: number, y: number): string {
  switch (kind) {
    case ContributionKind.COMMIT:
      return `<circle cx='${x}' cy='${y}' r='8' fill='#6c757d' />`;
    case ContributionKind.ISSUE:
      return `<rect x='${x - 8}' y='${y - 8}' width='16' height='16' fill='#6c757d' rx='4' />`;
    case ContributionKind.PR:
      return `<ellipse cx='${x}' cy='${y}' rx='8' ry='6' fill='#6c757d' />`;
    default:
      return '';
  }
}

export function renderContributorSVGCard({ contributor, width = 400, height = 180 }: ContributorSVGCardOptions): string {
  const totalContribs = prettifyNumber(contributor.contributions.total, 1);
  const repoCount = contributor.repositories.length;
  const first = contributor.first_contribution;
  const avatarUrl = `https://github.com/${contributor.login}.png`;
  return `
<svg width='${width}' height='${height}' viewBox='0 0 ${width} ${height}' xmlns='http://www.w3.org/2000/svg'>
  <g>
    <defs>
      <clipPath id='avatarClip'>
        <circle cx='44' cy='44' r='24' />
      </clipPath>
    </defs>
    <image href='${avatarUrl}' x='20' y='20' width='48' height='48' clip-path='url(#avatarClip)' />
    <text x='80' y='40' font-size='20' font-weight='bold' fill='#222'>${contributor.login}</text>
    <text x='80' y='65' font-size='14' fill='#555'>${totalContribs} contribution${contributor.contributions.total === 1 ? '' : 's'} to ${repoCount} repos</text>
    <text x='20' y='90' font-size='12' fill='#888'>First contribution:</text>
    ${getKindIcon(first.kind, 30, 110)}
    <text x='50' y='115' font-size='13' fill='#222' font-weight='bold'>${first.owner}/${first.repository}</text>
    <text x='50' y='130' font-size='12' fill='#555'>${first.title.trim()}</text>
    <text x='20' y='150' font-size='12' fill='#888'>Years:</text>
    <text x='70' y='150' font-size='12' fill='#222'>${contributor.years.join(', ')}</text>
    <text x='20' y='170' font-size='12' fill='#888'>Repos:</text>
    <text x='70' y='170' font-size='12' fill='#222'>${contributor.repositories.slice(0, 3).join(', ')}${repoCount > 3 ? '...' : ''}</text>
  </g>
</svg>
`;
}
