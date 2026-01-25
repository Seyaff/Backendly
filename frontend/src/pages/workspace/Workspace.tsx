import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthContext } from "@/context/auth.provider";

const Workspace = () => {
  const { WorkspaceData, SingleWorkspaceLoading } = useAuthContext();

  const workspace = WorkspaceData?.workspace;

  return SingleWorkspaceLoading ? (
    <div className="">
      <div>
        <div className="w-fit flex items-center gap-4">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="grid gap-2">
            <Skeleton className="h-4 w-37.5" />
            <Skeleton className="h-4 w-37.5" />
          </div>
        </div>
      </div>

      <div className="mt-10 flex  gap-5">
        <div className="w-full max-w-100 flex items-start gap-5 flex-col">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="aspect-video w-full" />
        </div>
        <div className="w-full max-w-100 flex items-start gap-5 flex-col">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="aspect-video w-full" />
        </div>
        <div className="w-full max-w-100 flex items-start gap-5 flex-col">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="aspect-video w-full" />
        </div>
    
       
      </div>
    </div>
  ) : (
    <div>
      <div className="max-w-100 text-wrap w-full ">
        <h1 className="text-4xl font-bold ">{workspace.name}</h1>
        <span className="text-sm font-normal tracking-tight leading-none text-gray-600">
          {workspace.description}
        </span>
      </div>
      <div className="mt-10">
  <div className="flex gap-6">
    <Card className="flex-1">
      <CardHeader>
        <h1 className="text-xl">Total Tasks</h1>
      </CardHeader>
      <CardContent>
        <h1 className="text-5xl font-bold">15</h1>
      </CardContent>
    </Card>

    <Card className="flex-1">
      <CardHeader>
        <h1 className="text-xl">Completed Tasks</h1>
      </CardHeader>
      <CardContent>
        <h1 className="text-5xl font-bold">10</h1>
      </CardContent>
    </Card>

    <Card className="flex-1">
      <CardHeader>
        <h1 className="text-xl">Pending Tasks</h1>
      </CardHeader>
      <CardContent>
        <h1 className="text-5xl font-bold">5</h1>
      </CardContent>
    </Card>
  </div>
</div>

    </div>
  );
};

export default Workspace;
