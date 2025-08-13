"use client";
import PersonalInfo from "@/components/form/PersonalInfo";
import JobDetails from "@/components/form/JobDetails";
import SkillsPreferences from "@/components/form/SkillsPreferences";
import EmergencyContact from "@/components/form/EmergencyContact";
import ReviewSubmit from "@/components/form/ReviewSubmit"; // Import ReviewSubmit
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emergencyContactSchema, jobDetailsSchema, personalInfoSchema, reviewSubmitSchema, skillsPreferencesSchema } from "@/lib/schemas";

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  profilePicture: FileList; // FileList for file input
  // Step 2 fields
  department: string;
  positionTitle: string;
  startDate: string;
  jobType: string;
  salaryExpectation: number; // Changed to number for slider
  manager: string;
  // Step 3 fields
  primarySkills: string[];
  workingHoursStart: string;
  workingHoursEnd: string;
  remoteWorkPreference: number;
  extraNotes: string;
  // Step 4 fields
  emergencyContactName: string;
  emergencyRelationship: string;
  emergencyPhoneNumber: string;
  guardianName?: string; // Optional
  guardianPhoneNumber?: string; // Optional
  // Step 5 fields
  confirmInformation: boolean;
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<FormData>({
    resolver: currentStep === 0 ? zodResolver(personalInfoSchema) : currentStep === 1 ? zodResolver(jobDetailsSchema) : currentStep === 2 ? zodResolver(skillsPreferencesSchema) : currentStep === 3 ? zodResolver(emergencyContactSchema) : currentStep === 4 ? zodResolver(reviewSubmitSchema) : undefined, // Add schema for Step 5
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      profilePicture: undefined,
      // Step 2 default values
      department: "",
      positionTitle: "",
      startDate: "",
      jobType: "",
      salaryExpectation: 30000, // Default for full-time
      manager: "",
      // Step 3 default values
      primarySkills: [],
      workingHoursStart: "",
      workingHoursEnd: "",
      remoteWorkPreference: 0,
      extraNotes: "",
      // Step 4 default values
      emergencyContactName: "",
      emergencyRelationship: "",
      emergencyPhoneNumber: "",
      guardianName: "",
      guardianPhoneNumber: "",
      // Step 5 default values
      confirmInformation: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Form submitted! Check console for data.");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-6 p-8 border rounded-lg shadow-lg max-w-md mx-auto bg-white dark:bg-gray-800"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Employee Onboarding Form
        </h1>

        <div className="flex justify-center space-x-2 mb-6">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full ${currentStep === index ? "bg-blue-600" : "bg-gray-300"}`}
            ></div>
          ))}
        </div>

        <div>
          <p className="text-center text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Current Step: {currentStep + 1}
          </p>
          {currentStep === 0 && <PersonalInfo />}
          {currentStep === 1 && <JobDetails />}
          {currentStep === 2 && <SkillsPreferences />}
          {currentStep === 3 && <EmergencyContact />}
          {currentStep === 4 && <ReviewSubmit />}
        </div>

        <div className="flex justify-between mt-6">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Back
            </button>
          )}
          {currentStep < 4 && (
            <button
              type="button"
              onClick={async () => {
                let isValid = false;
                if (currentStep === 0) {
                  isValid = await methods.trigger(["fullName", "email", "phoneNumber", "dateOfBirth", "profilePicture"]);
                } else if (currentStep === 1) {
                  isValid = await methods.trigger(["department", "positionTitle", "startDate", "jobType", "salaryExpectation", "manager"]);
                } else if (currentStep === 2) {
                  isValid = await methods.trigger(["primarySkills", "workingHoursStart", "workingHoursEnd", "remoteWorkPreference", "extraNotes"]);
                } else if (currentStep === 3) {
                  isValid = await methods.trigger(["emergencyContactName", "emergencyRelationship", "emergencyPhoneNumber", "guardianName", "guardianPhoneNumber"]);
                } else if (currentStep === 4) {
                  isValid = await methods.trigger(["confirmInformation"]);
                }
                // Add more conditions for other steps

                if (isValid) {
                  setCurrentStep(currentStep + 1);
                }
              }}
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          )}
          {currentStep === 4 && (
            <button type="submit" className="ml-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
