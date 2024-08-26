"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { createPatient } from "@/lib/actions/patient.actions";
import { Doctors, IdentificationTypes, patientRegisterFormInitialValues } from "@/lib/constants";
import type { User } from "@/lib/types";
import { patientRegisterFormSchema } from "@/lib/validationSchemas";

import { FileUploader } from "../FileUploader";
import { Checkbox } from "../ui/checkbox";
import { DatePicker } from "../ui/date-picker";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type FormValuesType = z.infer<typeof patientRegisterFormSchema>;

type RegisterFormType = {
  userInfo: User;
};

export const RegisterForm = (props: RegisterFormType) => {
  const router = useRouter();
  const [apiError, setApiError] = useState("");

  const form = useForm<FormValuesType>({
    resolver: zodResolver(patientRegisterFormSchema),
    defaultValues: { ...patientRegisterFormInitialValues, ...props.userInfo },
  });

  const onSubmit = async (values: FormValuesType) => {
    try {
      let formData;

      if (values.identificationDocument && values.identificationDocument.length > 0) {
        const blobFile = values.identificationDocument[0];

        formData = new FormData();
        formData.append("blobFile", blobFile);
      }

      const newPatient = await createPatient({
        ...values,
        userId: props.userInfo.$id,
        identificationDocument: values.identificationDocument ? formData : undefined,
      });

      if (newPatient) {
        router.push(`/patients/${newPatient.$id}/new-appointment`);
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Something went wrong";
      setApiError(msg);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-11">
        <section className="mb-12 space-y-4">
          <h1 className="text-28-bold md:text-32-bold text-light-900">Welcome!</h1>
          <p className="text-dark-700">Let us know more about yourself</p>
        </section>

        <section className="space-y-4">
          <h2 className="sub-header mb-6">Personal Information</h2>

          <div className="space-y-2 group" aria-disabled={true}>
            <Label>Name</Label>
            <Input disabled defaultValue={form.control._defaultValues.name} icon={<UserIcon size={18} />} />
          </div>

          <div className="flex gap-3 items-center">
            <div className="space-y-2 basis-1/2 group" aria-disabled={true}>
              <Label>Email address</Label>
              <Input disabled icon={<Mail size={18} />} defaultValue={form.control._defaultValues.email} />
            </div>

            <div className="space-y-2 basis-1/2 group" aria-disabled={true}>
              <Label>Phone number</Label>
              <PhoneInput disabled value={form.control._defaultValues.phone} />
            </div>
          </div>

          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="basis-1/2 flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <DatePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="basis-1/2 space-x-3">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex !ml-0">
                      <FormItem className="flex items-center space-x-2 space-y-0 py-3 rounded-sm px-5">
                        <FormControl>
                          <RadioGroupItem value="Male" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Female" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: 14 street, New York, NY - 5101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="emergencyContactName"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>Emergency contact name</FormLabel>
                  <FormControl>
                    <Input placeholder="Guardian's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContactNumber"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>Emergency contact number</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: +1(868) 579-9831" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className="space-y-6 mt-9">
          <h2 className="sub-header">Medical Information</h2>

          {/* PRIMARY CARE PHYSICIAN */}
          <FormField
            control={form.control}
            name="primaryPhysician"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Primary care physician</FormLabel>

                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a physician" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Doctors.map((doctor, i) => (
                      <SelectItem key={doctor.name + i} value={doctor.name}>
                        <div className="flex cursor-pointer items-center gap-2">
                          <Image
                            src={doctor.image}
                            width={32}
                            height={32}
                            alt="doctor"
                            className="rounded-full border border-dark-500"
                          />
                          <p>{doctor.name}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* INSURANCE & POLICY NUMBER */}
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="insuranceProvider"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>Insurance provider</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Blue Cross" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insurancePolicyNumber"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>Insurance policy number</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: ABC1234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>Allergies(if any)</FormLabel>
                  <FormControl>
                    <Input placeholder="Peanuts, Penicillin, Pollen" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentMedication"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>Current medications</FormLabel>
                  <FormControl>
                    <Input placeholder="Ibuprofen 200mg, Levothyroxine 50mcg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="familyMedicalHistory"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>Family medical history (if relevant)</FormLabel>
                  <FormControl>
                    <Input placeholder="Mother had brain cancer, Father has hypertension" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pastMedicalHistory"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>Past medical history</FormLabel>
                  <FormControl>
                    <Input placeholder="Appendectomy in 2015, Asthma diagnosis in childhood" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="sub-header">Identification and Verfication</h2>

          <FormField
            control={form.control}
            name="identificationType"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Identification Type</FormLabel>

                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {IdentificationTypes.map((type, i) => (
                      <SelectItem key={type + i} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="identificationNumber"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Identification Number</FormLabel>
                <FormControl>
                  <Input placeholder="123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="identificationDocument"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Scanned Copy of Identification Document</FormLabel>
                <FormControl>
                  <FileUploader onChange={field.onChange} files={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="space-y-4">
          <h2 className="sub-header mb-6">Consent and Privacy</h2>

          <FormField
            control={form.control}
            name="treatmentConsent"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>I consent to receive treatment for my health condition</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="disclosureConsent"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>
                  I consent to the use and disclosure of my health information for treatment purposes
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="privacyConsent"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>I acknowledge that I have reviewed and agree to the privacy policy</FormLabel>
              </FormItem>
            )}
          />
        </section>

        <FormMessage>{apiError}</FormMessage>
        <Button loading={form.formState.isSubmitting} type="submit">
          Submit and continue
        </Button>
      </form>
    </Form>
  );
};
