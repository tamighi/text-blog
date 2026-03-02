import Dialog from "@/components/Dialog";

type Props = {
  open: boolean;
  onClose?: () => void;
};

const AddLabelDialog = ({ open }: Props) => {
  return <Dialog open={open}>Hello World</Dialog>;
};

export default AddLabelDialog;
