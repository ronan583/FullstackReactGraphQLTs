import { withUrqlClient } from "next-urql";
import { Navbar } from "../components/NavBar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../gql/generated";
import { Layout } from "../components/Layout";
import Link from "next/link";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <Link href={"/create-post"}>Create Post</Link>
      <br />
      <div>helloworld</div>
      {!data ? (
        <div>loading......</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
