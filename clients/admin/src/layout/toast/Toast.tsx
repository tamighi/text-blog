export type ToastProps = {
  content: string;
  open: boolean;
};

const Toast = ({ content, open }: ToastProps) => {
  return (
    <>
      {open && (
        <div
          className="fixed bottom-12 w-full flex items-center justify-center
            z-50"
        >
          <div className="min-w-64 bg-elevation-1 border rounded-lg p-4">
            <span>{content}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
