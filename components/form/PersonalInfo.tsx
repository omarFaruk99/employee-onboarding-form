import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PersonalInfo() {
  const { register, formState: { errors }, watch, setValue } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Step 1: Personal Info</h2>
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name:</label>
        <Input id="fullName" {...register("fullName")} className="w-full" />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message as string}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email:</label>
        <Input id="email" {...register("email")} className="w-full" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number:</label>
        <Input id="phoneNumber" {...register("phoneNumber")} className="w-full" />
        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message as string}</p>}
      </div>
      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth:</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !watch("dateOfBirth") && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {watch("dateOfBirth") ? format(new Date(watch("dateOfBirth")), "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={watch("dateOfBirth") ? new Date(watch("dateOfBirth")) : undefined}
              onSelect={(date) => setValue("dateOfBirth", date ? format(date, "yyyy-MM-dd") : "")}
              initialFocus
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              captionLayout="dropdown"
              fromYear={1900}
              toYear={new Date().getFullYear()}
            />
          </PopoverContent>
        </Popover>
        {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message as string}</p>}
      </div>
      <div>
        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profile Picture:</label>
        <Input id="profilePicture" type="file" {...register("profilePicture")} className="w-full" />
        {errors.profilePicture && <p className="text-red-500 text-sm mt-1">{errors.profilePicture.message as string}</p>}
      </div>
    </div>
  );
}
