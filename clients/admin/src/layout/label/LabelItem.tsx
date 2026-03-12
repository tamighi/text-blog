import useDeletePostLabel from "@/hooks/query/useDeletePostLabel";
import type { Label } from "@shared/types/label";
import { useToast } from "../toast/ToastProvider";

type Props = {
  label: Label;
  postId?: number;
};

const LabelItem = ({ label, postId }: Props) => {
  const { toast } = useToast();

  const { mutate } = useDeletePostLabel({
    onSuccess: () => {
      toast({ content: "Label deleted." });
    },
    onError: () => toast({ content: "Error" }),
  });

  const onDelete = () => {
    if (postId) {
      mutate({ labelId: label.id, postId });
    }
  };

  return (
    <div
      className="px-2 py-1 rounded-full relative"
      style={{ backgroundColor: label.color }}
    >
      <button
        onClick={onDelete}
        className="flex items-center justify-center absolute w-5 h-5 -right-2
          -top-3 bg-elevation-2 rounded-full cursor-pointer"
      >
        ×
      </button>
      <span className="text-black">{label.content}</span>
    </div>
  );
};

export default LabelItem;
