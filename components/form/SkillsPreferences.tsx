import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { skillsByDepartment } from "@/data/mockData";

export default function SkillsPreferences() {
  const { register, control, setValue, watch, formState: { errors } } = useFormContext();
  const department = watch("department"); // Watch department from JobDetails
  const selectedSkills = watch("primarySkills") || [];

  const availableSkills = department ? skillsByDepartment[department as keyof typeof skillsByDepartment] : [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Step 3: Skills & Preferences</h2>

      {/* Primary Skills (checkboxes) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Primary Skills (choose at least 3):</label>
        <div className="grid grid-cols-2 gap-2">
          {availableSkills.map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                id={skill}
                checked={selectedSkills.includes(skill)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setValue("primarySkills", [...selectedSkills, skill]);
                  } else {
                    setValue("primarySkills", selectedSkills.filter((s: string) => s !== skill));
                  }
                }}
              />
              <Label htmlFor={skill}>{skill}</Label>
            </div>
          ))}
        </div>
        {errors.primarySkills && <p className="text-red-500 text-sm mt-1">{errors.primarySkills.message as string}</p>}
      </div>

      {/* Experience for Each Skill */}
      {selectedSkills.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Experience for Selected Skills</h3>
          {selectedSkills.map((skill) => (
            <div key={skill}>
              <label htmlFor={`skillExperiences.${skill}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {skill} (Years of Experience):
              </label>
              <Input
                id={`skillExperiences.${skill}`}
                type="number"
                {...register(`skillExperiences.${skill}`, { valueAsNumber: true })}
                min={0}
                className="w-full"
              />
              {errors.skillExperiences?.[skill] && <p className="text-red-500 text-sm mt-1">{(errors.skillExperiences as any)[skill]?.message as string}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Preferred Working Hours (time range: start - end) */}
      <div>
        <label htmlFor="workingHoursStart" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Working Hours:</label>
        <div className="flex space-x-2">
          <Input id="workingHoursStart" type="time" {...register("workingHoursStart")} className="w-1/2" />
          <Input id="workingHoursEnd" type="time" {...register("workingHoursEnd")} className="w-1/2" />
        </div>
        {(errors.workingHoursStart || errors.workingHoursEnd) && <p className="text-red-500 text-sm mt-1">{errors.workingHoursStart?.message as string || errors.workingHoursEnd?.message as string}</p>}
      </div>

      {/* Remote Work Preference (slider 0% to 100%) */}
      <div>
        <label htmlFor="remoteWorkPreference" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Remote Work Preference: {watch("remoteWorkPreference") || 0}%
        </label>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[watch("remoteWorkPreference") || 0]}
          onValueChange={(value) => setValue("remoteWorkPreference", value[0])}
          className="w-full"
        />
        {errors.remoteWorkPreference && <p className="text-red-500 text-sm mt-1">{errors.remoteWorkPreference.message as string}</p>}
      </div>

      {watch("remoteWorkPreference") > 50 && (
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox
            id="managerApproved"
            checked={watch("managerApproved")}
            onCheckedChange={(checked) => setValue("managerApproved", checked)}
          />
          <Label htmlFor="managerApproved">Manager Approved</Label>
        </div>
      )}

      {/* Extra Notes (optional, max 500 characters) */}
      <div>
        <label htmlFor="extraNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Extra Notes (optional, max 500 characters):</label>
        <Textarea id="extraNotes" {...register("extraNotes")} className="w-full" />
        {errors.extraNotes && <p className="text-red-500 text-sm mt-1">{errors.extraNotes.message as string}</p>}
      </div>
    </div>
  );
}
