// import DashboardTitle from "@/src/components/Title/DashboardTitle";

// const PackagePage = () => {
//   return (
//     <div className="">
//       <DashboardTitle title="Package" />
//     </div>
//   );
// };

import DashboardTitle from "@/src/components/shared/Title/DashboardTitle";
import { CurrectImage } from "@/src/lib/store/image/image";
import Image from "next/image";
import React from "react";

const PurchaseLog = () => {
  const plans = [
    {
      name: "Standard",
      dailyReturn: "0-7%",
      priceRange: "$25-$500",
      features: [
        "Capital Back",
        "Return Type",
        "Number Of Period",
        "Profit Withdraw",
        "Cancel",
      ],
      highlights: ["Lifetime", "Unlimited Time", "AnyTime"],
    },
    {
      name: "Professional",
      dailyReturn: "0-7%",
      priceRange: "$25-$500",
      features: [
        "Capital Back",
        "Return Type",
        "Number Of Period",
        "Profit Withdraw",
        "Cancel",
      ],
      highlights: ["Lifetime", "Unlimited Time", "AnyTime"],
    },
    {
      name: "Economics",
      dailyReturn: "0-7%",
      priceRange: "$25-$500",
      features: [
        "Capital Back",
        "Return Type",
        "Number Of Period",
        "Profit Withdraw",
        "Cancel",
      ],
      highlights: ["Lifetime", "Unlimited Time", "AnyTime"],
    },
  ];

  return (
    <div>
      <DashboardTitle title="Package" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white mt-5 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-[#CFD0D2"
          >
            <div className="p-3 py-10 ">
              <div className="text-center">
                <h2 className="text-[24px] font-medium">{plan.name}</h2>
                <p className="text-slate my-4">{plan.dailyReturn}</p>
              </div>
              <div className="border-t border-gray-200 pt-4" />
              <div className="text-center my-5">
                <p className="text-[24px] font-medium text-blue-500">
                  {plan.priceRange}
                </p>
              </div>
              <div className="pt-4">
                <ul className="space-y-2">
                  <li className="text-slate text-[14px] flex justify-between items-center py-3">
                    <p>Capital Back</p>{" "}
                    <Image
                      className="size-5"
                      src={CurrectImage.right}
                      alt="img"
                    />
                  </li>
                  <li className="text-slate text-[14px] flex justify-between items-center py-3">
                    <p>Return Type</p> <p className="text-black">Lifetime</p>
                  </li>
                  <li className="text-slate text-[14px] flex justify-between items-center py-3">
                    <p>Number of period</p>{" "}
                    <p className="text-black">Unlimited time</p>
                  </li>
                  <li className="text-slate text-[14px] flex justify-between items-center py-3">
                    <p>Profit withdraw</p> <p className="text-black">AnyTime</p>
                  </li>
                  <li className="text-slate text-[14px] flex justify-between items-center py-3">
                    <p>Cancel</p>{" "}
                    <Image
                      className="size-5"
                      src={CurrectImage.wrong}
                      alt="img"
                    />
                  </li>
                </ul>
              </div>

              <button className="w-full mt-5 mx-auto bg-[#487FFF] text-white font-medium py-2 rounded transition duration-300">
                Invest Now
              </button>
            </div>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseLog;
