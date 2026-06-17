import { useTina } from 'tinacms/dist/react';

function renderRichText(node: any): string {
  if (!node) return '';
  if (typeof node === 'string') return `<p>${node}</p>`;
  if (node.type === 'text') return node.text ?? '';
  const inner = Array.isArray(node.children)
    ? node.children.map(renderRichText).join('')
    : '';
  switch (node.type) {
    case 'root': return inner;
    case 'p': return `<p>${inner}</p>`;
    case 'a': return `<a href="${node.url}">${inner}</a>`;
    case 'strong': return `<strong>${inner}</strong>`;
    case 'em': return `<em>${inner}</em>`;
    default: return inner;
  }
}

export default function AboutEditor(props: { query: string; variables: any; data: any }) {
  const { data } = useTina(props);
  const about = data.about;
  const bioHtml = renderRichText(about.bio);

  return (
    <>
      {about.avatar
        ? <img className="about-avatar" src={about.avatar} alt={about.avatarAlt ?? about.name} />
        : <div className="about-avatar" aria-hidden="true">j</div>
      }
      <p className="about-name">{about.name}</p>
      <p className="about-handle">{about.handle} · {about.location}</p>
      <div className="about-body" dangerouslySetInnerHTML={{ __html: bioHtml }} />
      <nav className="about-links" aria-label="External links">
        {about.links?.map((link: any) => (
          <a key={link.url} href={link?.url ?? '#'} className="about-link">{link?.label}</a>
        ))}
      </nav>
    </>
  );
}
