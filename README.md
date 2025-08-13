# Employee Onboarding Form

This project implements a multi-step employee onboarding form as per the provided task requirements. It utilizes Next.js, React Hook Form for state management, Zod for validation, and Shadcn/ui for UI components, styled with Tailwind CSS.

## Technologies Used

*   **Next.js**: React framework for production.
*   **React Hook Form**: For efficient and flexible form management.
*   **Zod**: For schema validation.
*   **Shadcn/ui**: Reusable UI components.
*   **Tailwind CSS**: For utility-first styling.
*   **TypeScript**: For type safety.

## How to Run the Project

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd employee-onboarding-form
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
4.  Open your browser and navigate to `http://localhost:3000`.

## Explanation of Complex Logic

### Multi-Step Form Management
The `MultiStepForm.tsx` component orchestrates the entire multi-step process. It manages the `currentStep` state and uses `react-hook-form`'s `FormProvider` to make form methods available to all nested step components. Navigation between steps is controlled by "Next" and "Back" buttons, with validation triggering before advancing.

### Dynamic Validation with Zod and React Hook Form
Each step has its own Zod schema defined in `lib/schemas.ts`. The `zodResolver` is used with `react-hook-form` to automatically validate form inputs against these schemas. This ensures real-time feedback and prevents users from proceeding with invalid data.

### Conditional Rendering of Fields
*   **Guardian Contact:** In `EmergencyContact.tsx`, guardian contact fields (`guardianName`, `guardianPhoneNumber`) are conditionally rendered based on the applicant's `dateOfBirth` (if they are under 21).
*   **Manager Approved Checkbox:** In `SkillsPreferences.tsx`, a "Manager Approved" checkbox appears if the "Remote Work Preference" slider is set to a value greater than 50%.
*   **Skill Experiences:** In `SkillsPreferences.tsx`, input fields for "Years of Experience" dynamically appear for each skill selected in the "Primary Skills" checkbox list.

### Dynamic Filtering of Managers and Skills
*   **Managers:** In `JobDetails.tsx`, the list of available managers is dynamically filtered based on the selected `department`, ensuring only relevant managers are shown.
*   **Skills:** In `SkillsPreferences.tsx`, the available "Primary Skills" checkboxes are filtered based on the `department` selected in the "Job Details" step, providing department-specific skill options.

### Start Date Validation
The `jobDetailsSchema` includes a `superRefine` method to enforce specific rules for the `startDate`:
*   It cannot be in the past.
*   It cannot be more than 90 days in the future.
*   For "HR" or "Finance" departments, the start date **cannot be on a Friday or Saturday**.

### Unsaved Changes Warning
An `useEffect` hook in `MultiStepForm.tsx` listens for the browser's `beforeunload` event. If the form has unsaved changes (`methods.formState.isDirty` is true), it attempts to trigger a browser confirmation dialog to warn the user before they navigate away.

## Assumptions Made

*   **"Weekend" Definition for Start Date:** The task specified "cannot be on a weekend (Friday and Saturday)" for HR/Finance departments. Based on user clarification, this has been interpreted to mean that **Friday and Saturday are the only days restricted**, and Sunday is allowed.
*   **"Experience for Each Skill" Implementation:** This feature was implemented as a simple number input for "Years of Experience" for each selected skill. No specific range or type of experience (e.g., beginner/intermediate/expert) was specified, so a numerical input was chosen for simplicity and flexibility.
*   **Browser `beforeunload` Behavior:** The implementation for the "Unsaved Changes Warning" relies on the browser's `beforeunload` event. Due to modern browser security policies and restrictions, the appearance and behavior of this warning can vary and may not always show a custom message or appear in all navigation scenarios. This is a browser-level limitation and not a bug in the application's code.