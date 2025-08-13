import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function EmergencyContact() {
  const { register, control, setValue, watch, formState: { errors } } = useFormContext();

  // We'll need to watch the dateOfBirth from PersonalInfo for conditional Guardian Contact
  const dateOfBirth = watch("dateOfBirth");
  const isUnder21 = dateOfBirth ? (new Date().getFullYear() - new Date(dateOfBirth).getFullYear() < 21) : false;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Step 4: Emergency Contact</h2>

      {/* Contact Name (required) */}
      <div>
        <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Name:</label>
        <Input id="emergencyContactName" {...register("emergencyContactName")} className="w-full" />
        {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName.message as string}</p>}
      </div>

      {/* Relationship (dropdown) */}
      <div>
        <label htmlFor="emergencyRelationship" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Relationship:</label>
        <Select onValueChange={(value) => setValue("emergencyRelationship", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select relationship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Parent">Parent</SelectItem>
            <SelectItem value="Spouse">Spouse</SelectItem>
            <SelectItem value="Sibling">Sibling</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.emergencyRelationship && <p className="text-red-500 text-sm mt-1">{errors.emergencyRelationship.message as string}</p>}
      </div>

      {/* Phone Number (required, same format) */}
      <div>
        <label htmlFor="emergencyPhoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number:</label>
        <Input id="emergencyPhoneNumber" {...register("emergencyPhoneNumber")} className="w-full" />
        {errors.emergencyPhoneNumber && <p className="text-red-500 text-sm mt-1">{errors.emergencyPhoneNumber.message as string}</p>}
      </div>

      {/* Guardian Contact (conditional) */}
      {isUnder21 && (
        <div className="border p-4 rounded-md space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Guardian Contact (Applicant is under 21)</h3>
          <div>
            <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Guardian Name:</label>
            <Input id="guardianName" {...register("guardianName")} className="w-full" />
            {errors.guardianName && <p className="text-red-500 text-sm mt-1">{errors.guardianName.message as string}</p>}
          </div>
          <div>
            <label htmlFor="guardianPhoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Guardian Phone Number:</label>
            <Input id="guardianPhoneNumber" {...register("guardianPhoneNumber")} className="w-full" />
            {errors.guardianPhoneNumber && <p className="text-red-500 text-sm mt-1">{errors.guardianPhoneNumber.message as string}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
