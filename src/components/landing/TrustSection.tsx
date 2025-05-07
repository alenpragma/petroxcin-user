const TrustSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-serif text-3xl font-bold text-[#0A1F44]">
              10+
            </h3>
            <p className="text-center text-sm text-gray-600">
              Years of Experience
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-serif text-3xl font-bold text-[#0A1F44]">
              $500M+
            </h3>
            <p className="text-center text-sm text-gray-600">
              Assets Under Management
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-serif text-3xl font-bold text-[#0A1F44]">
              5000+
            </h3>
            <p className="text-center text-sm text-gray-600">
              Global Investors
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-serif text-3xl font-bold text-[#0A1F44]">
              24/7
            </h3>
            <p className="text-center text-sm text-gray-600">
              Customer Support
            </p>
          </div>
        </div>

        {/* Replace logo images with text badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          <div className="flex h-16 items-center justify-center rounded-lg border border-gray-200 bg-white px-6 shadow-sm transition-all duration-300 hover:border-[#C49B3E] hover:shadow">
            <span className="font-serif text-lg font-bold text-gray-700">
              FORBES
            </span>
          </div>
          <div className="flex h-16 items-center justify-center rounded-lg border border-gray-200 bg-white px-6 shadow-sm transition-all duration-300 hover:border-[#C49B3E] hover:shadow">
            <span className="font-serif text-lg font-bold text-gray-700">
              BLOOMBERG
            </span>
          </div>
          <div className="flex h-16 items-center justify-center rounded-lg border border-gray-200 bg-white px-6 shadow-sm transition-all duration-300 hover:border-[#C49B3E] hover:shadow">
            <span className="font-serif text-lg font-bold text-gray-700">
              NYSE
            </span>
          </div>
          <div className="flex h-16 items-center justify-center rounded-lg border border-gray-200 bg-white px-6 shadow-sm transition-all duration-300 hover:border-[#C49B3E] hover:shadow">
            <span className="font-serif text-lg font-bold text-gray-700">
              SEC
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TrustSection;

