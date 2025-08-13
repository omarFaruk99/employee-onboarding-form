"use client";
import PersonalInfo from "@/components/form/PersonalInfo";
import JobDetails from "@/components/form/JobDetails";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

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
  salaryExpectation: string;
  manager: string;
}

export default function MultiStepForm() {
  const methods = useForm<FormData>({
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
      salaryExpectation: "",
      manager: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(0);

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
          {currentStep < 4 && ( // Assuming 5 steps, so next button visible until step 4 (index 3)
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          )}
          {currentStep === 4 && ( // Assuming 5 steps, submit button visible on step 5 (index 4)
            <button type="submit" className="ml-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}