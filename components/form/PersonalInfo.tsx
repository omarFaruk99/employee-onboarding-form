import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function PersonalInfo() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Step 1: Personal Info</h2>
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name:</label>
        <Input id="fullName" {...register("fullName")} className="w-full" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email:</label>
        <Input id="email" {...register("email")} className="w-full" />
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number:</label>
        <Input id="phoneNumber" {...register("phoneNumber")} className="w-full" />
      </div>
      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth:</label>
        <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} className="w-full" />
      </div>
      <div>
        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profile Picture:</label>
        <Input id="profilePicture" type="file" {...register("profilePicture")} className="w-full" />
      </div>
    </div>
  );
}
