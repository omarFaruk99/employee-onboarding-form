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
import { Slider } from "@/components/ui/slider";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";

export default function JobDetails() {
  const { register, control, setValue, watch, formState: { errors } } = useFormContext();
  const jobType = watch("jobType");
  const department = watch("department");

  const filteredManagers = department
    ? mockManagers.filter((manager) => manager.department === department)
    : mockManagers;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Step 2: Job Details</h2>
      {/* Department (dropdown) */}
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department:</label>
        <Select onValueChange={(value) => setValue("department", value)} value={department}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(skillsByDepartment).map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department.message as string}</p>}
      </div>
      {/* Position Title (required, min 3 characters) */}
      <div>
        <label htmlFor="positionTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position Title:</label>
        <Input id="positionTitle" {...register("positionTitle")} className="w-full" />
        {errors.positionTitle && <p className="text-red-500 text-sm mt-1">{errors.positionTitle.message as string}</p>}
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
        {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message as string}</p>}
      </div>
      {/* Job Type (Radio: Full-time, Part-time, Contract) */}
      <div>
        <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Type:</label>
        <RadioGroup onValueChange={(value) => setValue("jobType", value)} value={jobType}>
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
        {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType.message as string}</p>}
      </div>
      {/* Salary Expectation (conditional) */}
      {jobType && (
        <div>
          <label htmlFor="salaryExpectation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Salary Expectation: {jobType === "Full-time" ? `${watch("salaryExpectation") || 30000}` : `${watch("salaryExpectation") || 50}/hour`}
          </label>
          <Slider
            min={jobType === "Full-time" ? 30000 : 50}
            max={jobType === "Full-time" ? 200000 : 150}
            step={jobType === "Full-time" ? 1000 : 1}
            value={[watch("salaryExpectation") || (jobType === "Full-time" ? 30000 : 50)]}
            onValueChange={(value) => setValue("salaryExpectation", value[0])}
            className="w-full"
          />
          {errors.salaryExpectation && <p className="text-red-500 text-sm mt-1">{errors.salaryExpectation.message as string}</p>}
        </div>
      )}
      {/* Manager (searchable dropdown, filtered by department) */}
      <div>
        <label htmlFor="manager" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Manager:</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {watch("manager")
                ? filteredManagers.find((manager) => manager.name === watch("manager"))?.name
                : "Select manager..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput placeholder="Search manager..." />
              <CommandEmpty>No manager found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {filteredManagers.map((manager) => (
                    <CommandItem
                      key={manager.id}
                      value={manager.name}
                      onSelect={(currentValue) => {
                        setValue("manager", currentValue === watch("manager") ? "" : currentValue);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          watch("manager") === manager.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {manager.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {errors.manager && <p className="text-red-500 text-sm mt-1">{errors.manager.message as string}</p>}
      </div>
    </div>
  );
}