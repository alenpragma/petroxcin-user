"use client";
import type React from "react";
import { useMemo, useRef, useState } from "react";
import {
  Avatar,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { useGetData } from "@/src/utils/fetch/axiosConfig/FetchData";
import Loadingcomponents from "@/src/components/shared/loadingComponents/LoadingComponents";
import { IUserProfileResponse } from "@/src/types/dashboard/dashboardType/dashboardType";
import { CopyToClipboard } from "@/src/components/shared/copyClipboard/copyClipboard";
import {
  GenericForm,
  GenericFormRef,
} from "@/src/components/form copy/GenericForm";
import { z } from "zod";
import { TextField } from "@/src/components/form copy/fields/TextField";
import axiosInstance from "@/src/utils/fetch/axiosConfig/axiosConfig";
import { useMutation } from "@tanstack/react-query";
import { SelectField } from "@/src/components/form copy/fields/SelectField";
import { SubmitButton } from "@/src/components/form copy/fields/SubmitButton";
import { showSuccessModal } from "@/src/components/shared/toastAlert/ToastSuccess";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  name: z.string().nonempty({ message: "Enter your name" }),
  mobile: z.string().min(6, { message: "Enter your mobile" }),
  address: z.string().optional(),
  nid_or_passport: z.string().optional(),
  year: z.string().optional(),
  day: z.string().optional(),
  month: z.string().optional(),
});

type FormType = z.infer<typeof FormSchema>;

export default function ProfileClient() {
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const { data: profileDatas, isLoading } = useGetData(["profile"], `profile`);
  const profile: IUserProfileResponse = profileDatas.data;
  // const mobile = Number(profile.user.mobile);
  const initialValues: FormType = {
    name: profile.user.name,
    mobile: profile.user.mobile,
    nid_or_passport: profile.user.nid_or_passport || "",
    year: "",
    day: "",
    month: "",
    address: profile.user.address || "",
  };

  // Inside your component
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // Store file
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const { copy, copied } = CopyToClipboard();
  const referralURL = `https://www.petroxcin.com/register?refer=${profile.user.refer_code}`;
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType) => {
      const date = `${data.year}-${String(data.month).padStart(
        2,
        "0"
      )}-${String(data.day).padStart(2, "0")}`;
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("mobile", data.mobile.toLocaleString());
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      if (data.address) {
        formData.append("address", data.address);
      }
      if (data.day) {
        formData.append("birthday", date);
      }
      if (data.nid_or_passport) {
        formData.append("nid_or_passport", data.nid_or_passport);
      }
      const response = await axiosInstance.post(`/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    },
    onSuccess: (data: any) => {
      showSuccessModal("Success", data?.data?.message);
      router.push("/dashboard");
    },
    onError(err) {
      console.log(err);
    },
  });
  const handleSubmit = (data: FormType) => {
    mutate(data);
  };
  const [selectedMonth, setSelectedMonth] = useState("0"); // "0" means not selected
  const [selectedYear, setSelectedYear] = useState("");

  const currentYear = new Date().getFullYear();

  const months = [
    { value: "0", text: "Month" },
    { value: "1", text: "January" },
    { value: "2", text: "February" },
    { value: "3", text: "March" },
    { value: "4", text: "April" },
    { value: "5", text: "May" },
    { value: "6", text: "June" },
    { value: "7", text: "July" },
    { value: "8", text: "August" },
    { value: "9", text: "September" },
    { value: "10", text: "October" },
    { value: "11", text: "November" },
    { value: "12", text: "December" },
  ];

  const years = [
    { value: "0", text: "Year" },
    ...Array.from({ length: 100 }, (_, i) => {
      const y = currentYear - i;
      return { value: String(y), text: String(y) };
    }),
  ];

  // 💡 Memoized days list, recalculated only when month or year changes
  const days = useMemo(() => {
    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth);

    if (!month || !year) {
      // Default 31 days if month/year not selected
      return Array.from({ length: 31 }, (_, i) => ({
        value: String(i + 1),
        text: String(i + 1),
      }));
    }

    // Month is 1-based; JavaScript Date uses 0-based month, so subtract 1
    const daysInMonth = new Date(year, month, 0).getDate(); // tricky but correct

    return Array.from({ length: daysInMonth }, (_, i) => ({
      value: String(i + 1),
      text: String(i + 1),
    }));
  }, [selectedMonth, selectedYear]);

  const handleChenge = (value: string) => {
    setSelectedYear(value);
    setSelectedMonth(value);
  };
  if (isLoading) return <Loadingcomponents />;
  return (
    <div className="py-6 px-3">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and profile information
        </p>
      </div>

      <div className="">
        <GenericForm
          schema={FormSchema}
          initialValues={initialValues}
          onSubmit={(data) => handleSubmit(data as FormType)}
          ref={formRef}
        >
          <div className="grid grid-cols-12 gap-3">
            <div className="md:col-span-4 col-span-12 py-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border flex flex-col justify-center">
              <div className="flex flex-col items-center space-y-4">
                <div onClick={handleAvatarClick} className="cursor-pointer">
                  <Avatar className="size-28 p-1 border border-gray-500">
                    <AvatarImage
                      className="size-full object-cover rounded-full"
                      src={
                        previewImage ||
                        `https://api.petroxcin.com/public/storage/${profile.user.image}`
                      }
                      alt="Profile"
                    />
                  </Avatar>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </div>
              <h6 className="font-medium flex justify-center items-center text-[18px] mt-4 gap-1">
                {profile.user.name}
                <span>
                  {" "}
                  {profile.user.kyc_status !== "0" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#0d14ed"
                      className="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                      />
                    </svg>
                  )}
                </span>
              </h6>
              <p className="text-center">{profile.user.email}</p>
              <p className=" space-x-3 text-center">
                <span className="font-medium">KYC Verified :</span>
                <span>
                  {profile.user.kyc_status === "0"
                    ? "Not Verified"
                    : "Verified"}
                </span>
              </p>
            </div>

            <div className="md:col-span-8 col-span-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                <TextField
                  name="name"
                  label="Name"
                  type="text"
                  placeholder="remon"
                  inputClass=""
                />
                <TextField
                  name="mobile"
                  label="Mobile"
                  type="number"
                  placeholder=""
                  inputClass=""
                />
                <TextField
                  name="nid_or_passport"
                  label="NID/PASSPORT NO."
                  type="number"
                  placeholder="Enter your NID number"
                />
                <div>
                  <p className="font-medium mb-2">Enter Your Birthday</p>
                  <div className="w-full flex  gap-1">
                    <div className="flex-1">
                      <SelectField
                        name="year"
                        options={years}
                        placeholder=" Year"
                        onChange={handleChenge}
                      />
                    </div>
                    <div className="flex-1">
                      {" "}
                      <SelectField
                        name="month"
                        options={months}
                        placeholder=" Month"
                        onChange={handleChenge}
                      />{" "}
                    </div>
                    <div className="flex-1">
                      <SelectField
                        name="day"
                        options={days}
                        placeholder="Day"
                      />
                    </div>
                  </div>
                </div>

                {/* <DateField name="dob" label="Date of Birth" /> */}
              </div>
              <div className="mt-3">
                <TextField
                  name="address"
                  label="Address"
                  type="text"
                  placeholder="Enter your address"
                  inputClass=""
                />
              </div>
              <div className="mt-3">
                <SubmitButton
                  width="full"
                  label="Update Profile"
                  isLoading={isPending}
                  loadingLabel="Processing.."
                />
              </div>
            </div>
          </div>
        </GenericForm>

        <div className="md:col-span-7 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border mt-6">
          <h2 className="font-semibold text-lg mb-4">Your Referral Link</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Share this link with your friends and earn rewards when they join.
          </p>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">{referralURL}</div>
            <Button
              className="border border-gray-400 bg-[#ffffff2d] text-gray-700 px-4 py-0 text-[12px] hover:bg-[#707070be] hover:text-white ml-2"
              onClick={() => copy(referralURL)}
              type="button"
            >
              {copied ? "Copied" : "Copy Link"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
