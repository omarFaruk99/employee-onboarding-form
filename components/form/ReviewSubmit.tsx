import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function ReviewSubmit() {
  const { watch, formState: { errors }, setValue } = useFormContext();

  // Watch all form data to display for review
  const formData = watch();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Step 5: Review & Submit</h2>

      <div className="border p-4 rounded-md space-y-2 bg-gray-50 dark:bg-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Personal Information</h3>
        <p><strong>Full Name:</strong> {formData.fullName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
        <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
        {/* Profile Picture will be handled differently, maybe just show filename or a placeholder */}
        <p><strong>Profile Picture:</strong> {formData.profilePicture?.[0]?.name || "Not selected"}</p>
      </div>

      <div className="border p-4 rounded-md space-y-2 bg-gray-50 dark:bg-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Job Details</h3>
        <p><strong>Department:</strong> {formData.department}</p>
        <p><strong>Position Title:</strong> {formData.positionTitle}</p>
        <p><strong>Start Date:</strong> {formData.startDate}</p>
        <p><strong>Job Type:</strong> {formData.jobType}</p>
        <p><strong>Salary Expectation:</strong> {formData.salaryExpectation}</p>
        <p><strong>Manager:</strong> {formData.manager}</p>
      </div>

      <div className="border p-4 rounded-md space-y-2 bg-gray-50 dark:bg-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Skills & Preferences</h3>
        <p><strong>Primary Skills:</strong> {formData.primarySkills?.join(", ")}</p>
        <p><strong>Working Hours:</strong> {formData.workingHoursStart} - {formData.workingHoursEnd}</p>
        <p><strong>Remote Work Preference:</strong> {formData.remoteWorkPreference}%</p>
        <p><strong>Extra Notes:</strong> {formData.extraNotes || "N/A"}</p>
      </div>

      <div className="border p-4 rounded-md space-y-2 bg-gray-50 dark:bg-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Emergency Contact</h3>
        <p><strong>Contact Name:</strong> {formData.emergencyContactName}</p>
        <p><strong>Relationship:</strong> {formData.emergencyRelationship}</p>
        <p><strong>Phone Number:</strong> {formData.emergencyPhoneNumber}</p>
        {formData.guardianName && <p><strong>Guardian Name:</strong> {formData.guardianName}</p>}
        {formData.guardianPhoneNumber && <p><strong>Guardian Phone Number:</strong> {formData.guardianPhoneNumber}</p>}
      </div>

      {/* Confirmation Checkbox */}
      <div className="flex items-center space-x-2 mt-4">
        <Checkbox
          id="confirmInformation"
          checked={watch("confirmInformation")}
          onCheckedChange={(checked) => setValue("confirmInformation", checked)}
        />
        <Label htmlFor="confirmInformation">I confirm all information is correct</Label>
      </div>
      {errors.confirmInformation && <p className="text-red-500 text-sm mt-1">{errors.confirmInformation.message as string}</p>}
    </div>
  );
}
