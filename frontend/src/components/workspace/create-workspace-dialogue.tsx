import useCreateWorkspaceDialog from "@/hooks/use-create-workspace-dialgoue";
import { Dialog, DialogContent } from "../ui/dialog";
import WorkspaceForm from "./create-workspace.form";

const CreateWorkspaceDialogue = () => {
  const { open, onClose } = useCreateWorkspaceDialog();
  return (
    <Dialog  open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl p-0! overflow-hidden border-0">
      
        <WorkspaceForm {...{ onClose }} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceDialogue;
