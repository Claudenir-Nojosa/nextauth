import { FormPost } from "@/components/FormPost";
import { title } from "@/components/shared/primitives";

const EditPostPage = () => {
  return (
    <>
      <h1 className={title({ color: "cyan" })}>Editar Post</h1>
      <FormPost isEditing={true} />
    </>
  );
};

export default EditPostPage;
