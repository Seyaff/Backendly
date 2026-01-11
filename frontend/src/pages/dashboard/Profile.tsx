import { useAuthContext } from "@/context/auth.provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p>Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black text-white text-2xl font-bold">
          <span>{user?.name.charAt(0)}</span>
        </div>

        <div className="tracking-tight">
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-gray-600 text-sm mt-1">{user?.email}</p> {/* Reduced spacing with mt-1 */}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Profile Info */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>Manage your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </CardContent>
      </Card>

      {/* Settings Section */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Update your preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full">Change Password</Button>
          <Button variant="outline" className="w-full">Update Email</Button>
          <Button variant="destructive" className="w-full">Delete Account</Button>
        </CardContent>
      </Card>

      {/* Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>See what you've been up to</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <p>No recent activity</p>
        </CardContent>
      </Card>
    </main>
  );
};

export default Profile;
