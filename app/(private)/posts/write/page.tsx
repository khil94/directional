import PostForm from "../components/postForm";

export default async function WritePage() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <PostForm />
      </div>
    </div>
  );
}
