import { getPostDetail } from "@/app/api/lib/serverAPI";
import PostForm from "../../components/postForm";

export default async function PostEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const data = await getPostDetail(id);

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <PostForm mode={{ id, mode: "edit" }} initialData={data} />
      </div>
    </div>
  );
}
