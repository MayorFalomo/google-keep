export default function Page({ params }: { params: { slug: string } }) {
  return <h1>My Page: {params.slug} </h1>;
}
