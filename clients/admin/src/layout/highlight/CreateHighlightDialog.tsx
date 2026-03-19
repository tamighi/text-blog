import Autocomplete from "@/components/Autocomplete";
import Button from "@/components/Button";
import ColorPicker from "@/components/ColorPicker";
import Dialog from "@/components/Dialog";
import useLabels from "@/hooks/query/useLabels";
import type { Post } from "@shared/index";
import { type Label } from "@shared/types/label";
import React from "react";
import CreateLabelDialog from "../label/CreateLabelDialog";

type Props = {
  open?: boolean;
  onClose?: () => void;
  onCreate?: (label: Label) => void;
  post: Post;
};

const CreateHighlightDialog = ({
  open = false,
  onClose,
  onCreate,
  post,
}: Props) => {
  const [createOpen, setCreateOpen] = React.useState(false);
  const [label, setLabel] = React.useState<Label>();
  const [comment, setComment] = React.useState("");

  const { data: labels = [] } = useLabels({ enabled: open });

  const labelOptions = React.useMemo(
    () =>
      labels
        .filter((l) => !post.highlights.some((pl) => pl.id === l.id))
        .map((l) => l.content),
    [labels],
  );

  const onAutocompleteChange = (content: string) => {
    const newLabel = labels.find((v) => v.content === content);
    setLabel(newLabel);
  };

  const reset = () => {
    setLabel(undefined);
    setComment("");
  };

  const _onClose = () => {
    reset();
    onClose?.();
  };

  return (
    <Dialog open={open} onClose={_onClose} title={"Assign label"}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-start gap-4">
          <Autocomplete
            placeholder="Name"
            options={labelOptions}
            onChange={onAutocompleteChange}
          />

          <ColorPicker value={label?.color} disabled />
        </div>
        <textarea
          className="input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="flex items-center">
          <div className="flex-1">
            <Button onClick={() => setCreateOpen(true)} color="success">
              New label
            </Button>
          </div>
          <div className="flex gap-4">
            <Button onClick={onClose}>Cancel</Button>
            <Button disabled={!label} onClick={() => onCreate?.(label!)}>
              Assign
            </Button>
          </div>
        </div>
      </div>

      <CreateLabelDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </Dialog>
  );
};

export default CreateHighlightDialog;
