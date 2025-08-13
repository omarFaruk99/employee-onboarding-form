import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full Name is required").refine(name => name.split(" ").length >= 2, "Full Name must have at least 2 words"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone Number is required").regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"), // E.164 format
  dateOfBirth: z.string().min(1, "Date of Birth is required").refine(dob => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  }, "You must be at least 18 years old"),
  profilePicture: z.any()
    .refine((files) => files?.length > 0 ? files?.[0]?.size <= 2000000 : true, `Max file size is 2MB.`)
    .refine(
      (files) => files?.length > 0 ? ["image/jpeg", "image/png"].includes(files?.[0]?.type) : true,
      "Only .jpg, .jpeg, and .png formats are supported."
    ).optional(),
});

export const jobDetailsSchema = z.object({
  department: z.string().min(1, "Department is required"),
  positionTitle: z.string().min(3, "Position Title must be at least 3 characters"),
  startDate: z.string().refine((dateString) => {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to start of day

    // Not in the past
    if (selectedDate < today) {
      return false;
    }

    // Max 90 days in the future
    const ninetyDaysFromNow = new Date();
    ninetyDaysFromNow.setDate(ninetyDaysFromNow.getDate() + 90);
    ninetyDaysFromNow.setHours(0, 0, 0, 0); // Normalize to start of day

    if (selectedDate > ninetyDaysFromNow) {
      return false;
    }

    return true;
  }, "Start Date must be within 90 days from today and not in the past"),
  jobType: z.string().min(1, "Job Type is required"),
  salaryExpectation: z.number().optional(), // Will be refined later based on jobType
  manager: z.string().min(1, "Manager is required"),
});

export const skillsPreferencesSchema = z.object({
  primarySkills: z.array(z.string()).min(3, "Please select at least 3 primary skills"),
  workingHoursStart: z.string().min(1, "Start time is required"),
  workingHoursEnd: z.string().min(1, "End time is required"),
  remoteWorkPreference: z.number().min(0).max(100),
  extraNotes: z.string().max(500, "Extra Notes cannot exceed 500 characters").optional(),
});

export const emergencyContactSchema = z.object({
  emergencyContactName: z.string().min(1, "Contact Name is required"),
  emergencyRelationship: z.string().min(1, "Relationship is required"),
  emergencyPhoneNumber: z.string().min(1, "Phone Number is required").regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  guardianName: z.string().optional(),
  guardianPhoneNumber: z.string().optional(),
}).superRefine((data, ctx) => {
  // Conditional validation for Guardian Contact if applicant is under 21
  // We need to access dateOfBirth from the main form data for this.
  // This will be handled in MultiStepForm's onSubmit or trigger logic
  // as Zod's superRefine here doesn't have direct access to other step's data easily.
});

export const reviewSubmitSchema = z.object({
  confirmInformation: z.boolean().refine(val => val === true, "You must confirm the information is correct"),
});
