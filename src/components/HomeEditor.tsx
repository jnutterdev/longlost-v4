import { useTina } from 'tinacms/dist/react';

export default function HomeEditor(props: { query: string; variables: any; data: any }) {
  const { data } = useTina(props);
  const home = data.home;

  return (
    <section className="intro">
      <p className="tagline">{home.tagline}</p>
      <h1 className="headline">{home.headline}</h1>
      <p className="desc">{home.desc}</p>
    </section>
  );
}
