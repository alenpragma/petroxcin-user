// "use client";

// import { TextField } from "@/src/components/form copy/fields/TextField";
// import {
//   GenericForm,
//   GenericFormRef,
// } from "@/src/components/form copy/GenericForm";
// import { CopyToClipboard } from "@/src/components/shared/copyClipboard/copyClipboard";
// import Loadingcomponents from "@/src/components/shared/loadingComponents/LoadingComponents";
// import { Button } from "@/src/components/ui/button";
// import { IUserProfileResponse } from "@/src/types/dashboard/dashboardType/dashboardType";
// import { useGetData } from "@/src/utils/fetch/axiosConfig/FetchData";
// import Image from "next/image";
// import { useRef, useState } from "react";
// import { z } from "zod";

// const FormSchema = z.object({
//   name: z.string().nonempty({ message: "Enter your name" }),
//   mobile: z.number().min(6, { message: "Enter your mobile" }),
// });
// type FormType = z.infer<typeof FormSchema>;

// const ProfilePage = () => {
//   const formRef = useRef<GenericFormRef<FormType>>(null);
//   const { data: profileData, isLoading } = useGetData(["profile"], `profile`);
//   const [isEditable, setIsEditable] = useState(false); // ← Add edit state

//   if (isLoading) return <Loadingcomponents />;

//   const profile: IUserProfileResponse = profileData.data;
//   const mobile = Number(profile.user.mobile);
//   const initialValues: FormType = {
//     name: profile.user.name,
//     mobile: mobile,
//   };

//   const { copy, copied } = CopyToClipboard();
//   const referralURL = `https://www.petroxcin.com/register?refer=${profile.user.refer_code}`;

//   const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
//     console.log(data);
//   };

//   return (
//     <div className="px-3">
//       <div className="bg-gradient-to-l from-[#ffffff53] to-[#09fc2545] h-24 w-full mb-2 rounded"></div>
//       <div className="md:w-4/5 w-full mx-auto">
//         <div className="flex items-center gap-5">
//           <div className="size-24 bg-gray-400 p-1 rounded-full overflow-hidden">
//             <Image
//               className="size-full object-cover rounded-full"
//               src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
//               alt="img"
//               width={500}
//               height={500}
//             />
//           </div>
//           <div>
//             <h6 className="font-medium text-[18px]">{profile.user.name}</h6>
//             <p className="text-gray-600">{profile.user.email}</p>
//           </div>
//           <div>
//             <button
//               className="w-fit px-3 py-1 rounded-mg bg-primary text-white rounded-md"
//               onClick={() => setIsEditable((prev) => !prev)}
//             >
//               {isEditable ? "Cancel" : "Edit"}
//             </button>
//           </div>
//         </div>

//         <GenericForm
//           schema={FormSchema}
//           initialValues={initialValues}
//           onSubmit={handleSubmit}
//           ref={formRef}
//         >
//           <div className="space-y-5 mt-8">
//             <div className="flex items-center w-full">
//               <h6 className="font-medium md:w-1/6 w-2/6 flex justify-between">
//                 Name <span className="pr-5">:</span>
//               </h6>
//               <div className="md:w-5/6 w-4/6">
//                 <TextField
//                   name="name"
//                   type="text"
//                   labelClass="text"
//                   inputClass="px-2"
//                   readOnly={!isEditable}
//                 />
//               </div>
//             </div>

//             <div className="flex items-center w-full">
//               <h6 className="font-medium md:w-1/6 w-2/6 flex justify-between">
//                 Mobile <span className="pr-5">:</span>
//               </h6>
//               <div className="w-5/6">
//                 <TextField
//                   name="mobile"
//                   type="number"
//                   labelClass="text"
//                   inputClass="px-2"
//                   readOnly={!isEditable}
//                 />
//               </div>
//             </div>

//             <div className="flex items-center w-full">
//               <h6 className="font-medium md:w-1/6 w-2/6 flex justify-between">
//                 Refer <span className="pr-5">:</span>
//               </h6>
//               <div className="w-5/6">
//                 <span>{referralURL}</span>
//                 <Button
//                   className="border border-gray-400 bg-[#ffffff2d] text-gray-700 px-4 py-0 text-[12px] hover:bg-[#707070be] hover:text-white ml-2"
//                   onClick={() => copy(referralURL)}
//                   type="button"
//                 >
//                   {copied ? "Copied" : "Copy Link"}
//                 </Button>
//               </div>
//             </div>

//             <div className="flex items-center w-full">
//               <h6 className="font-medium md:w-1/6 w-2/6 flex justify-between">
//                 KYC status <span className="pr-5">:</span>
//               </h6>
//               <div className="w-5/6">
//                 <span>True</span>
//               </div>
//             </div>

//             <div className="flex items-center w-full">
//               <h6 className="font-medium md:w-1/6 w-2/6 flex justify-between">
//                 Direct Refer <span className="pr-5">:</span>
//               </h6>
//               <div className="w-5/6">
//                 <span>50</span>
//               </div>
//             </div>

//             <div className="flex items-center w-full">
//               <h6 className="font-medium md:w-1/6 w-2/6 flex justify-between">
//                 Total Team <span className="pr-5">:</span>
//               </h6>
//               <div className="w-5/6">
//                 <span>20</span>
//               </div>
//             </div>

//             {isEditable && (
//               <div className="flex justify-end">
//                 <Button type="submit" className="bg-primary text-white px-6">
//                   Save
//                 </Button>
//               </div>
//             )}
//           </div>
//         </GenericForm>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

"use client";
import type React from "react";
import { useRef, useState } from "react";
import { User } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
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
import { DateField } from "@/src/components/form copy/fields/DateField";

const FormSchema = z.object({
  name: z.string().nonempty({ message: "Enter your name" }),
  address: z.string().nonempty({ message: "Enter your name" }),
  mobile: z.number().min(6, { message: "Enter your mobile" }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});
type FormType = z.infer<typeof FormSchema>;

export default function ProfileClient() {
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const { data: profileDatas, isLoading } = useGetData(["profile"], `profile`);
  const profile: IUserProfileResponse = profileDatas.data;
  const mobile = Number(profile.user.mobile);
  const initialValues: FormType = {
    name: profile.user.name,
    mobile: mobile,
    dob: new Date(),
    address: "",
  };

  // Inside your component
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const { copy, copied } = CopyToClipboard();
  const referralURL = `https://www.petroxcin.com/register?refer=${profile.user.refer_code}`;
  if (isLoading) return <Loadingcomponents />;
  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    console.log(data);
  };
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
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="grid grid-cols-12 gap-3">
            <div className="md:col-span-4 col-span-12 py-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border flex flex-col justify-center">
              <div className="flex flex-col items-center space-y-4">
                <div onClick={handleAvatarClick} className="cursor-pointer">
                  <Avatar className="size-28 border border-gray-500 p-0.5">
                    <AvatarImage
                      className="object-cover"
                      src={
                        previewImage ||
                        "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                      }
                      alt="Profile"
                    />
                    <AvatarFallback>
                      <User className="w-12 h-12" />
                    </AvatarFallback>
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
                  placeholder="remon"
                  inputClass=""
                />
                <TextField
                  name="nid"
                  label="NID/PASSPORT NO."
                  type="number"
                  placeholder="345834958034958943"
                />
                <DateField name="dob" label="Date of Birth" />
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
              <div className="mt-6">
                <Button type="submit" className="w-full md:w-auto">
                  Save Changes
                </Button>
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
