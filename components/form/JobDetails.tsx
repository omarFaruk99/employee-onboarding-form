import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { mockManagers, skillsByDepartment } from "@/data/mockData";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react"; // Assuming lucide-react is installed
import { cn } from "@/lib/utils";

export default function JobDetails() {
  const { register, control, setValue, watch } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Step 2: Job Details</h2>
      {/* Department (dropdown) */}
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department:</label>
        <Select onValueChange={(value) => setValue("department", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(skillsByDepartment).map((department) => (
              <SelectItem key={department} value={department}>
                {department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Position Title (required, min 3 characters) */}
      <div>
        <label htmlFor="positionTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position Title:</label>
        <Input id="positionTitle" {...register("positionTitle")} className="w-full" />
      </div>
      {/* Start Date (not in the past, max 90 days in the future) */}
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date:</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !watch("startDate") && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {watch("startDate") ? format(new Date(watch("startDate")), "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={watch("startDate") ? new Date(watch("startDate")) : undefined}
              onSelect={(date) => setValue("startDate", date ? format(date, "yyyy-MM-dd") : "")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* Job Type (Radio: Full-time, Part-time, Contract) */}
      <div>
        <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Type:</label>
        <RadioGroup onValueChange={(value) => setValue("jobType", value)} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Full-time" id="full-time" />
            <Label htmlFor="full-time">Full-time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Part-time" id="part-time" />
            <Label htmlFor="part-time">Part-time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Contract" id="contract" />
            <Label htmlFor="contract">Contract</Label>
          </div>
        </RadioGroup>
      </div>
      {/* Salary Expectation (conditional) */}
      <div>
        <label htmlFor="salaryExpectation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salary Expectation:</label>
        <Input id="salaryExpectation" {...register("salaryExpectation")} className="w-full" placeholder="e.g., 50000" />
      </div>
      {/* Manager (searchable dropdown, filtered by department) */}
      <div>
        <label htmlFor="manager" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Manager:</label>
        <Input id="manager" {...register("manager")} className="w-full" placeholder="e.g., Alice Johnson" />
      </div>
    </div>
  );
}