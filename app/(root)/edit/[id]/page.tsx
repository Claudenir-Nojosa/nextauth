import { FormPost } from "@/components/FormPost";
import { title as textTitle } from "@/components/shared/Primitives";

const EditPostPage = () => {
  return (
    <>
      <h1 className={textTitle({ color: "cyan" })}>Editar Post</h1>
      <FormPost isEditing={true} />
    </>
  );
};

export default EditPostPage;
