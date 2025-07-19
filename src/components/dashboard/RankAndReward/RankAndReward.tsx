"use client";

import DashboardTitle from "@/src/components/shared/Title/DashboardTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import UseTable, { TData } from "../../shared/table/UseTable";
import { rewardImage } from "@/src/lib/store/image/image";


const RankAndRewardComponent = () => {
  const rewardsData = [
    {
      level: "1st",
      personalSponsor: 5,
      teamMember: 10,
      teamSale: "$3,000",
      reward: "$100",
    },
    {
      level: "2nd",
      personalSponsor: 10,
      teamMember: 30,
      teamSale: "$7,000",
      reward: "$300",
    },
    {
      level: "3rd",
      personalSponsor: 20,
      teamMember: 80,
      teamSale: "$15,000",
      reward: "$500",
    },
  ];

  const headers = [
    "Lavel",
    "Personal Sponsor",
    "Total Team Member",
    " Total Team Sale",
    "Rewards",
  ];

  return (
    <div className=" ">
      <div className="p-4">
        <DashboardTitle title="Rank And Reward" />
      </div>
      <div>
        <div className="">
          <div className="max-w-full">
            <Swiper
              spaceBetween={20}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
              }}
              modules={[Pagination, Autoplay]}
              className="mySwiper"
            >
              <SwiperSlide className="">
                <Image
                  className=" w-full h-[250px]"
                  src={rewardImage.rewardBanner}
                  alt="img"
                  width={500}
                  height={500}
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="max-w-full mx-auto overflow-x-auto mt-10 bg-white rounded-lg shadow-md">
            <UseTable headers={headers} className="rounded-md">
              {rewardsData?.map((item, index) => {
                const isLast = index === rewardsData.length - 1;

                return (
                  <tr key={index}>
                    <TData className={isLast ? "border-b-0" : ""}>
                      {item.level}
                    </TData>
                    <TData className={isLast ? "border-b-0" : ""}>
                      {item.personalSponsor}
                    </TData>
                    <TData className={isLast ? "border-b-0" : ""}>
                      {item.teamMember}
                    </TData>
                    <TData className={isLast ? "border-b-0" : ""}>
                      {item.reward}
                    </TData>
                    <TData className={isLast ? "border-b-0" : ""}>
                      {item.teamSale}
                    </TData>
                  </tr>
                );
              })}
            </UseTable>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default RankAndRewardComponent;
